import { App, navQueryNotFound } from '../../app';

const app = getApp<App>();

interface OptionForm<T extends OptionsFor, V = unknown> {
  key: T;
  name: string;
  getValue: () => V;
  setValue: (value: any) => void;
  options: { name: string; value: V }[];
}

const enum OptionsFor {
  UILang = 'uilang',
  Mode = 'mode',
  Animation = 'animation',
}

// const reLaunchToApply = () =>
//   wx.showModal({
//     cancelText: '下次再说',
//     confirmText: '立即重启',
//     content: '更新此项配置后，建议重启小程序以获得更好的体验',
//     title: '提示',
//     success: res => {
//       if (!res.confirm) return;
//       wx.reLaunch({ url: '/pages/index/index' });
//     },
//   });

const forms: { [K in OptionsFor]: OptionForm<K> } = {
  mode: {
    name: '主题',
    key: OptionsFor.Mode,
    getValue: () => app.ui.UserSetting.mode,
    setValue: mode => app.ui.UserSetting.update({ mode }),
    options: [
      { name: '自动', value: 'auto' },
      { name: '浅色', value: 'light' },
      { name: '深色', value: 'dark' },
    ],
  },
  uilang: {
    name: '风格',
    key: OptionsFor.UILang,
    getValue: () => app.ui.UserSetting.uilang,
    setValue: uilang => app.ui.UserSetting.update({ uilang }),
    options: [
      { name: 'Human Interface Guidelines', value: 'hig' },
      { name: 'Material Design', value: 'material' },
    ],
  },
  animation: {
    name: '禁用动画',
    key: OptionsFor.Animation,
    getValue: () => app.ui.UserSetting.animation,
    setValue: animation => app.ui.UserSetting.update({ animation }),
    options: [
      { name: '仅低电量时', value: 'auto' },
      { name: '永不', value: false },
      { name: '总是', value: true },
    ],
  },
};

interface Data extends OptionForm<any> {
  value: any;
}

const initialData = {} as Data;

Page({
  ...app.eachPage,
  data: { ...app.eachPage.data, ...initialData },
  onLoad(query: { for?: OptionsFor } = {}) {
    this.onLoadOne(this, query);
    if (!query.for) return navQueryNotFound();
    this.setPageTitle(this, forms[query.for].name).update({
      ...forms[query.for],
      value: forms[query.for].getValue(),
    }).commit();
  },
  onShow() {
    this.onShowOne(this);
  },
  onUnload() {
    this.onUnloadOne(this);
  },
  onSelect(event: any) {
    const { dataset = {} } = event.currentTarget;
    if (!('value' in dataset)) return;
    this.data.setValue(dataset.value);
    this.setData({ value: this.data.getValue() });
  },
});
