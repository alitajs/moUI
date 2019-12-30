import { App, EachPage } from '../../app';

const app = getApp<App>();

interface Data {
  UIUserSetting: MP.UI.UserSetting;
  disableOnSwiper?: boolean;
  tabIndex: 0 | 1;
}

const initialData: Data = {
  UIUserSetting: app.ui.UserSetting,
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
      const { pos: change } = event.currentTarget.dataset;
      if (change) this.mutant().update({ tabIndex: this.data.tabIndex + change });
    } else if (event.type === 'swiperend') {
      const { current: tabIndex } = event.detail;
      this.mutant().update({ tabIndex, disableOnSwiper: true });
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
