import { EachPage } from '../../app';

const Common: ThisType<EachPage<{ navbarTitleVisible: boolean }>> = {
  onPageScroll(options: Page.IPageScrollOption) {
    if (this.data.navbarTitleVisible) {
      if (options.scrollTop < 64)
        this.setData({ navbarTitleVisible: this.data.navbarTitleVisible = false });
    } else if (options.scrollTop > 70)
      this.setData({ navbarTitleVisible: this.data.navbarTitleVisible = true });
  },
};

export default Common;
