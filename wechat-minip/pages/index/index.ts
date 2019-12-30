import { App, EachPage, Version } from '../../app';

const app = getApp<App>();

interface ComponentsGroup {
  title: string;
  components: { name: string; suffix: string; folder: string }[];
}

interface Data {
  UIUserSetting: MP.UI.UserSetting;
  components: ComponentsGroup[];
  disableOnSwiper?: boolean;
  swiperIndex: 0 | 1;
  tabIndex: 0 | 1;
  tabsMeta: [string, string][];
  versionMark: string;
}

const components: Data['components'] = [
  {
    title: '通用',
    components: [
      { name: '按钮', suffix: 'Button', folder: 'button' },
      { name: '图表', suffix: 'Icon', folder: 'icon' },
      { name: '排版', suffix: 'Typography', folder: 'typography' },
    ],
  },
];

const initialData: Data = {
  UIUserSetting: app.ui.UserSetting,
  components,
  swiperIndex: 0,
  tabIndex: 0,
  tabsMeta: [
    ['moUI', 'layout'],
    ['设置', 'setting'],
  ],
  versionMark: Version.stringify(app.version, 'v'),
};

Page({
  ...(app.eachPage as EachPage<Data>),
  data: { ...app.eachPage.data, ...initialData },
  onLoad(query: Record<string, string>) {
    this.onLoadOne(this, query).commit();
  },
  onShow() {
    this.onShowOne(this);
    this.updateSettings();
  },
  onUnload() {
    this.onUnloadOne(this);
  },
  onShareAppMessage() {
    return {};
  },
  onChangeTab(event: WXML.TapEvent<{ pos: number }> | Comp.SwiperEndEvent) {
    const { swiperIndex, tabIndex, tabsMeta } = this.data;
    if (event.type === 'tap') {
      const nextSwiperIndex = tabIndex + event.currentTarget.dataset.pos;
      if (nextSwiperIndex === swiperIndex) return;
      return this.setData({ swiperIndex: nextSwiperIndex });
    }
    if (event.type === 'swiperend') {
      const nextTabIndex = event.detail.current;
      this.mutant().update({ disableOnSwiper: true });
      if (nextTabIndex === tabIndex) return this.mutant().commit();
      this.setPageTitle(this, tabsMeta[nextTabIndex][0])
        .update({ swiperIndex: nextTabIndex, tabIndex: nextTabIndex })
        .commit();
    }
  },
  afterRemoveSwiperEffect() {
    this.setData({ disableOnSwiper: false });
  },
  updateSettings() {
    if (this.data.UIUserSetting === app.ui.UserSetting) return;
    this.setData({ UIUserSetting: app.ui.UserSetting });
  },
});
