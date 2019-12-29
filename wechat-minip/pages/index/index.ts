import { App, EachPage } from '../../app';

const app = getApp<App>();

interface Data {
  navbarVisible: boolean;
}

const initialData: Data = {
  navbarVisible: false,
};

Page({
  ...(app.eachPage as EachPage<Data>),
  data: { ...app.eachPage.data, ...initialData },
  onLoad(query: Record<string, string>) {
    this.onLoadOne(this, query).commit();
  },
  onShow() {
    this.onShowOne(this);
  },
  onUnload() {
    this.onUnloadOne(this);
  },
  onShareAppMessage() {
    return {};
  },
  onPageScroll(options: Page.IPageScrollOption) {
    if (options.scrollTop < 40 && this.data.navbarVisible)
      this.setData({ navbarVisible: this.data.navbarVisible = false });
    else if (options.scrollTop > 48 && !this.data.navbarVisible)
      this.setData({ navbarVisible: this.data.navbarVisible = true });
  },
});
