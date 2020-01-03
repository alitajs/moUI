import { App, EachPage } from '../../../app';
import Common from '../common';

const app = getApp<App>();

interface Data {
  navbarTitleVisible: boolean;
  tagSize: Comp.TagSize;
  tagSizeMap: { value: Comp.TagSize; text: string }[];
}

const initialData: Data = {
  navbarTitleVisible: false,
  tagSize: 'default',
  tagSizeMap: [
    { value: 'default', text: '默认' },
    { value: 'small', text: '小型' },
    { value: 'tiny', text: '微型' },
  ],
};

Page({
  ...Common,
  ...(app.eachPage as EachPage<Data>),
  data: { ...app.eachPage.data, ...initialData },
  onLoad(query: Record<string, string>) {
    this.onLoadOne(query, '标签').commit();
  },
  onChangeSize(event: WXML.TapEvent<{ index: number }>) {
    this.setData({ tagSize: this.data.tagSizeMap[event.currentTarget.dataset.index].value });
  },
});
