import { App, EachPage } from '../../app';

const app = getApp<App>();

interface Data {
  UIUserSetting: MP.UI.UserSetting;
  disableOnSwiper?: boolean;
  swiperIndex: 0 | 1;
  tabIndex: 0 | 1;
}

const initialData: Data = {
  UIUserSetting: app.ui.UserSetting,
  swiperIndex: 0,
  tabIndex: 0,
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
    if (event.type === 'tap') {
      const nextSwiperIndex = this.data.tabIndex + event.currentTarget.dataset.pos;
      if (nextSwiperIndex !== this.data.swiperIndex)
        this.mutant().update({ swiperIndex: nextSwiperIndex });
    } else if (event.type === 'swiperend') {
      const { current } = event.detail;
      this.mutant().update({ disableOnSwiper: true, swiperIndex: current, tabIndex: current });
    }
    this.mutant().commit();
  },
  afterRemoveSwiperEffect() {
    this.setData({ disableOnSwiper: false });
  },
  updateSettings() {
    if (this.data.UIUserSetting === app.ui.UserSetting) return;
    this.setData({ UIUserSetting: app.ui.UserSetting });
  },
});
