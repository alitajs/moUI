import { App, EachPage } from '../../../app';
import Common from '../common';

const app = getApp<App>();

interface Data {
  navbarTitleVisible: boolean;
  switchLoading: boolean;
}

const initialData: Data = {
  navbarTitleVisible: false,
  switchLoading: true,
};

Page({
  ...Common,
  ...(app.eachPage as EachPage<Data>),
  data: { ...app.eachPage.data, ...initialData },
  onLoad(query: Record<string, string>) {
    this.onLoadOne(query, '开关').commit();
  },
  setLoading() {
    this.setData({ switchLoading: !this.data.switchLoading });
  },
});
