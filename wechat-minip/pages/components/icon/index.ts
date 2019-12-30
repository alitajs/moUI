import { App, EachPage } from '../../../app';
import Common from '../common';

const app = getApp<App>();

interface Data {
  navbarTitleVisible: boolean;
}

const initialData: Data = {
  navbarTitleVisible: false,
};

Page({
  ...Common,
  ...(app.eachPage as EachPage<Data>),
  data: { ...app.eachPage.data, ...initialData },
  onLoad(query: Record<string, string>) {
    this.onLoadOne(query, '图标').commit();
  },
});
