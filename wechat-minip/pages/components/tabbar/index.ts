import { App, EachPage } from '../../../app';
import Common from '../common';

const app = getApp<App>();

interface Data {
  currentTab: number;
  navbarTitleVisible: boolean;
}

const initialData: Data = {
  currentTab: 0,
  navbarTitleVisible: false,
};

Page({
  ...Common,
  ...(app.eachPage as EachPage<Data>),
  data: { ...app.eachPage.data, ...initialData },
  onLoad(query: Record<string, string>) {
    this.onLoadOne(query, '标签栏').commit();
  },
  onTapTabbar(event: WXML.TapEvent<{ pos: number }>) {
    const nextTab = this.data.currentTab + event.currentTarget.dataset.pos;
    this.setData({ currentTab: Math.max(0, nextTab) });
  },
});
