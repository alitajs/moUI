import { App } from '../../../app';

const app = getApp<App>();

Page({
  ...app.eachPage,
  data: { ...app.eachPage.data },
  onLoad(query: Record<string, string>) {
    this.onLoadOne(this, query, '按钮').commit();
  },
  onShow() {
    this.onShowOne(this);
  },
  onUnload() {
    this.onUnloadOne(this);
  },
});
