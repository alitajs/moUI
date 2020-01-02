import { App, EachPage } from '../../../app';
import Common from '../common';

const app = getApp<App>();

interface Data {
  loadingState: Partial<Record<string, boolean>>;
  navbarTitleVisible: boolean;
}

const initialData: Data = {
  loadingState: {},
  navbarTitleVisible: false,
};

Page({
  ...Common,
  ...(app.eachPage as EachPage<Data>),
  data: { ...app.eachPage.data, ...initialData },
  onLoad(query: Record<string, string>) {
    this.onLoadOne(query, '加载态').commit();
  },
  setLoading({ currentTarget: { dataset } }: WXML.TapEvent<{ for: string }>) {
    this.setData({ [`loadingState.${dataset.for}`]: !this.data.loadingState[dataset.for] });
  },
});
