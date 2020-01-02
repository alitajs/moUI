import { App, EachPage, Version, dictHasDiff } from '../../app';

const app = getApp<App>();

interface ComponentsGroup {
  title: string;
  components: { name: string; suffix: string; folder: string }[];
}

interface Data {
  UIUserSetting: MP.UI.UserSetting;
  components: ComponentsGroup[];
  disableOnSwiper?: boolean;
  indexNavbarVisible?: boolean;
  swiperIndex: 0 | 1;
  tabIndex: 0 | 1;
  tabsMeta: { title: string; icon: string; scrollTop?: number }[];
  versionMark: string;
}

const components: Data['components'] = [
  {
    title: '通用',
    components: [
      { name: '按钮', suffix: 'Button', folder: 'button' },
      { name: '图标', suffix: 'Icon', folder: 'icon' },
      { name: '排版', suffix: 'Typography', folder: 'typography' },
    ],
  },
  {
    title: '导航',
    components: [{ name: '标签栏', suffix: 'TabBar', folder: 'tabbar' }],
  },
  {
    title: '数据展示',
    components: [
      { name: '头像', suffix: 'Avatar', folder: 'avatar' },
      { name: '徽标数', suffix: 'Badge', folder: 'badge' },
      { name: '列表', suffix: 'List', folder: 'list' },
      { name: '标签', suffix: 'Tag', folder: 'tag' },
    ],
  },
  {
    title: '数据录入',
    components: [
      { name: '搜索栏', suffix: 'SearchBar', folder: 'searchbar' },
      { name: '开关', suffix: 'Switch', folder: 'switch' },
    ],
  },
  {
    title: '反馈',
    components: [{ name: '蒙层', suffix: 'Mask', folder: 'mask' }],
  },
];

const initialData: Data = {
  UIUserSetting: { ...app.ui.UserSetting },
  components,
  swiperIndex: 0,
  tabIndex: 0,
  tabsMeta: [
    { title: 'moUI', icon: 'layout' },
    { title: '设置', icon: 'setting' },
  ],
  versionMark: Version.stringify(app.version, 'v'),
};

Page({
  ...(app.eachPage as EachPage<Data>),
  data: { ...app.eachPage.data, ...initialData },
  backTop() {
    this.setData({ [`tabsMeta[${this.data.tabIndex}].scrollTop`]: 0 });
  },
  onLoad(query: Record<string, string>) {
    this.onLoadOne(query).commit();
    if (query.path) wx.navigateTo({ url: decodeURIComponent(query.path) });
  },
  onShow() {
    this.onShowOne();
    this.updateSettings().commit();
  },
  onShareAppMessage() {
    return { title: this.data._.title };
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
      this.setPageTitle(tabsMeta[nextTabIndex].title)
        .update({ swiperIndex: nextTabIndex, tabIndex: nextTabIndex })
        .commit();
    }
  },
  afterRemoveSwiperEffect() {
    this.setData({ disableOnSwiper: false });
  },
  updateSettings() {
    if (!dictHasDiff(app.ui.UserSetting, this.data.UIUserSetting)) return this.mutant();
    return this.mutant().update({ UIUserSetting: { ...app.ui.UserSetting } });
  },
  onScroll(event: WXML.ScrollEvent) {
    if (this.data.indexNavbarVisible) {
      if (event.detail.scrollTop < 96)
        this.setData({ indexNavbarVisible: this.data.indexNavbarVisible = false });
    } else if (event.detail.scrollTop > 100)
      this.setData({ indexNavbarVisible: this.data.indexNavbarVisible = true });
  },
});
