import { App, EachPage } from '../../../app';
import Common from '../common';

const app = getApp<App>();

interface Data {
  maskIcon?: string;
  maskVisible: boolean;
  navbarTitleVisible: boolean;
}

const initialData: Data = {
  maskVisible: false,
  navbarTitleVisible: false,
};

Page({
  ...Common,
  ...(app.eachPage as EachPage<Data>),
  data: { ...app.eachPage.data, ...initialData },
  onLoad(query: Record<string, string>) {
    this.onLoadOne(query, '图标').commit();
  },
  onPreview(event: WXML.TapEvent<{ icon: string }>) {
    this.setData({ maskIcon: event.currentTarget.dataset.icon, maskVisible: true });
  },
  hidePreview() {
    this.setData({ maskVisible: false });
  },
});
