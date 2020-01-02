import { App, EachPage } from '../../../app';
import Common from '../common';

const app = getApp<App>();

interface Data {
  pageVisible?: boolean;
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
    this.onLoadOne(query, '叠加页').commit();
  },
  setVisible() {
    const nextPageVisible = !this.data.pageVisible;
    app.ui.updateNativeContainerStyle(nextPageVisible ? { mode: 'dark' } : undefined);
    this.setData({ pageVisible: nextPageVisible });
  },
});
