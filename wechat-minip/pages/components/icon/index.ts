import { App, EachPage } from '../../../app';
import Common from '../common';

const app = getApp<App>();

interface Data {
  page: number;
  maskIcon?: string;
  maskVisible: boolean;
  navbarTitleVisible: boolean;
}

const initialData: Data = {
  page: 0,
  maskVisible: false,
  navbarTitleVisible: false,
};

Page({
  ...Common,
  ...(app.eachPage as EachPage<Data>),
  data: { ...app.eachPage.data, ...initialData },
  onLoad(query: Record<string, string>) {
    this.onLoadOne(query, '图标').commit();
  },
  onPreview(event: WXML.TapEvent<{ icon: string }>) {
    this.setData({ maskIcon: event.currentTarget.dataset.icon, maskVisible: true });
  },
  hidePreview() {
    this.setData({ maskVisible: false });
  },
  onPageScroll(options: Page.IPageScrollOption) {
    const page = Math.trunc(options.scrollTop / 168);
    if (this.data.navbarTitleVisible) {
      if (options.scrollTop < 64)
        this.mutant().update({ navbarTitleVisible: this.data.navbarTitleVisible = false });
    } else if (options.scrollTop > 70)
      this.mutant().update({ navbarTitleVisible: this.data.navbarTitleVisible = true });
    if (this.data.page !== page) this.mutant().update({ page });
    this.mutant().commit();
  },
});
