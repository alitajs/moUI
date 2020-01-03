import { App, EachPage } from '../../../app';
import Common from '../common';

const app = getApp<App>();

interface Data {
  navbarTitleVisible: boolean;
  visibleMaskMark: string | null;
}

const initialData: Data = {
  navbarTitleVisible: false,
  visibleMaskMark: null,
};

Page({
  ...Common,
  ...(app.eachPage as EachPage<Data>),
  data: { ...app.eachPage.data, ...initialData },
  onLoad(query: Record<string, string>) {
    this.onLoadOne(query, '蒙层').commit();
  },
  setVisible(event: WXML.TapEvent<{ mark?: string }>) {
    this.setData({ visibleMaskMark: event.currentTarget.dataset.mark || null });
  },
});
