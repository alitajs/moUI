import { App, EachPage } from '../../../app';
import Common from '../common';

const app = getApp<App>();

interface Avatar {
  icon?: string;
  image?: string | true;
  shape?: Comp.AvatarShape;
  size?: Comp.AvatarSize;
  text?: string;
}

interface CardRow extends Partial<Avatar> {
  instances: Avatar[];
}

interface CardBody extends Avatar {
  id: number;
  rows: CardRow[];
}

interface Data {
  cards: CardBody[];
  navbarTitleVisible: boolean;
}

const textAvatars: Avatar[] = [
  { size: 'large', text: 'A' },
  { text: 'B' },
  { size: 'small', text: 'C' },
];

const imageAvatars: Avatar[] = [
  { icon: 'setting' },
  { text: 'A', image: 'invalid-url' },
  { text: 'B', image: true },
  { text: 'C', image: `${app.cdn}/assets/iNqXoRxHIpT11P2lNngSc2EskNiek1XhtG63uFAPfR7XqYhi` },
  { text: 'D', image: `${app.cdn}/assets/CW7ipm6DF5pxd7VpG0bUGWyhqwVGtNtvhfgdAVlig8Lr78Zj` },
];

const cards: CardBody[] = [
  {
    id: 0,
    text: '三种大小、两种形状可选，覆盖 --avatarSize 变量可统一控制头像大小、字号与行高',
    rows: [{ instances: textAvatars }, { shape: 'square', instances: textAvatars }],
  },
  {
    id: 1,
    text:
      '图片类头像，可直接为 <image /> 设置 m-avatar 样式类，也可将 <image />（或 <open-data />）与文字包裹在内，图像不显示时默认展示文字',
    rows: [{ instances: imageAvatars }, { shape: 'square', instances: imageAvatars }],
  },
];

const initialData: Data = {
  cards,
  navbarTitleVisible: false,
};

Page({
  ...Common,
  ...(app.eachPage as EachPage<Data>),
  data: { ...app.eachPage.data, ...initialData },
  onLoad(query: Record<string, string>) {
    this.onLoadOne(query, '头像').commit();
  },
  onPreview({ currentTarget: { dataset } }: WXML.TapEvent<{ src: string }>) {
    wx.previewImage({ current: dataset.src, urls: [dataset.src] });
  },
});
