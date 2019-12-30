import {
  BaseMutant,
  DataMutant,
  UI,
  Version,
  createTask,
  querystring,
  truncate,
} from './utils/index';

export * from './utils/index';

export interface EachPageData {
  from: string;
  title: string;
  ui: UI.UISetting['PageData'];
}

export const enum WellKnownGlobalKey {}

export interface EachPage<T = any> extends Omit<Page.PageThis<T>, 'data'> {
  vars: Record<string, any>;
  data: { _: EachPageData } & T;
  backTop: () => void;
  consolelog: Console['log'];
  mutant: () => DataMutant<EachPageData & T>;
  noop: () => void;
  onLoadOne: (
    page: EachPage,
    query?: Partial<Record<string, string>>,
    title?: string,
  ) => DataMutant<EachPageData & T>;
  onShareAppMessage: (options?: Page.IShareAppMessageOption) => Page.ICustomShareContent;
  onShowOne: (page: EachPage) => DataMutant<EachPageData & T>;
  onUnloadOne: (page: EachPage) => DataMutant<EachPageData & T>;
  setPageTitle: (page: EachPage, title: string) => DataMutant<EachPageData & T>;
  toast: (title: string, duration?: number, mask?: boolean) => void;
}

export interface App {
  global: Map<any, any>;
  pages: Page.PageInstance[];
  pagesMutant: BaseMutant<EachPage<{}>['data']>;
  eachPage: Omit<EachPage<any>, 'data'> & Pick<EachPage<{}>, 'data'>;
  reLaunch: () => void;
  ui: UI.UISetting;
  version: MP.Version;
}

export const AppLaunchTaskRef = createTask<App.AppInstance<App> & App>();

const ui = new UI.UISetting();
const AppRef = {
  value: null as (App.AppInstance<App> & App) | null,
  get: () => AppRef.value ?? getApp<App>(),
};
const pagesMutant = new BaseMutant<EachPage<{}>['data']>(next =>
  AppRef.value?.pages.forEach(page => page?.setData?.(next)),
);
const eachPage = {
  ...({} as Pick<EachPage<{}>, 'setData' | 'route'>),
  vars: {},
  data: { _: { from: '返回', title: 'moUI', ui: ui.PageData } },
  consolelog: console.log,
  backTop: () => wx.pageScrollTo({ scrollTop: 0 }),
  mutant() {
    const page: EachPage<{}> = this;
    return (page.vars.__mutant = page.vars.__mutant || new DataMutant(page));
  },
  noop: () => {},
  onLoadOne: (page, _query = {}, title = 'moUI') => {
    const pages = AppRef.get().pages;
    const from = pages[pages.length - 1]?.data?._?.title ?? '返回';
    pages.push(page);
    return page.setPageTitle(page, title).update({ '_.from': truncate(from, 8) });
  },
  onShareAppMessage(options) {
    const page: EachPage<{}> = this;
    const from = options && options.from;
    const query = querystring({ path: `/${page.route}`, from });
    return {
      title: page.data._.title || 'moUI',
      path: `/pages/index/index?${query}`,
    };
  },
  onShowOne: page => {
    AppRef.get().ui.loadIconfont();
    AppRef.get().ui.forceUpdateUserSetting();
    return page.mutant();
  },
  onUnloadOne: page => {
    const index = AppRef.get().pages.indexOf(page);
    if (index > -1) AppRef.get().pages.splice(index, 1);
    return page.mutant();
  },
  setPageTitle: (page, title) => page.mutant().update({ '_.title': truncate(title, 14) }),
  toast: (title, duration = 1.5, mask) =>
    wx.showToast({ icon: 'none', mask, title, duration: duration * 1000 }),
} as EachPage<{}>;

App<App>({
  onLaunch() {
    this.ui.App = AppRef.value = this;
    Version.applyMPVersion(this.version, {}).then(() => {
      AppLaunchTaskRef.resolve((AppLaunchTaskRef.result = this));
    });
  },
  onShow() {
    this.ui.loadIconfont(500);
    this.ui.forceUpdateUserSetting();
  },
  reLaunch() {
    wx.reLaunch({ url: '/pages/index/index' });
  },
  eachPage,
  global: new Map(),
  pages: [],
  pagesMutant,
  ui,
  version: { major: 2, minor: 0, patch: 0 },
});
