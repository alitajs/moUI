import { App, EachPage } from '../../../app';

const app = getApp<App>();

interface Data {
  currentTab: number;
  for?: string;
}

const initialData: Data = {
  currentTab: 0,
};

Page({
  ...(app.eachPage as EachPage<Data>),
  data: { ...app.eachPage.data, ...initialData },
  onShareAppMessage: undefined,
  onLoad(query: Record<string, string>) {
    this.onLoadOne(query, '示例')
      .update({ for: query.for })
      .commit();
  },
  switchTheme() {
    app.ui.UserSetting.update({ uilang: app.ui.UserSetting.uilang === 'hig' ? 'material' : 'hig' });
  },
  onChangeTab(event: WXML.TapEvent<{ pos: number }>) {
    const nextTab = this.data.currentTab + event.currentTarget.dataset.pos;
    this.setData({ currentTab: Math.max(0, nextTab) });
  },
});
