import { App, EachPage } from '../../../app';
import Common from '../common';

const app = getApp<App>();

interface Data {
  badgeVisible: boolean;
  navbarTitleVisible: boolean;
}

const initialData: Data = {
  badgeVisible: true,
  navbarTitleVisible: false,
};

Page({
  ...Common,
  ...(app.eachPage as EachPage<Data>),
  data: { ...app.eachPage.data, ...initialData },
  onLoad(query: Record<string, string>) {
    this.onLoadOne(query, '徽标数').commit();
  },
  setVisible() {
    this.setData({ badgeVisible: !this.data.badgeVisible });
  },
});
