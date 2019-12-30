import { App } from '../../../app';

const app = getApp<App>();

Page({
  ...app.eachPage,
  data: { ...app.eachPage.data },
  onLoad(query: Record<string, string>) {
    this.onLoadOne(query, '排版').commit();
  },
});
