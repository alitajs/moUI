import { App, EachPage } from '../../../app';
import Common from '../common';

const app = getApp<App>();

interface Data {
  isRoundShape?: boolean;
  loading?: boolean;
  navbarTitleVisible: boolean;
  size?: Comp.ButtonSize;
}

const initialData: Data = {
  navbarTitleVisible: false,
};

const buttonSize: Comp.ButtonSize[] = ['large', 'default', 'small', 'tiny'];

Page({
  ...Common,
  ...(app.eachPage as EachPage<Data>),
  data: { ...app.eachPage.data, ...initialData },
  onLoad(query: Record<string, string>) {
    this.onLoadOne(query, '按钮').commit();
  },
  setBoolean(event: WXML.TapEvent<{ for: keyof Data }>) {
    const key = event.currentTarget.dataset.for;
    this.setData({ [key]: !this.data[key] });
  },
  setSize(event: WXML.TapEvent<{ index: number }>) {
    this.setData({ size: buttonSize[event.currentTarget.dataset.index] });
  },
});
