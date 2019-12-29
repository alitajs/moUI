import { App } from '../../app';

const app = getApp<App>();

interface Data {
  UIUserSetting: MP.UI.UserSetting;
}

Page({
  ...app.eachPage,
  data: {
    ...app.eachPage.data,
    UIUserSetting: app.ui.UserSetting,
  } as Data,
  onLoad(query: Record<string, string>) {
    this.onLoadOne(this, query, '设置').commit();
  },
  onShow() {
    this.onShowOne(this);
    this.updateValue();
  },
  onUnload() {
    this.onUnloadOne(this);
  },
  updateValue() {
    this.setData({ UIUserSetting: app.ui.UserSetting });
  },
});
