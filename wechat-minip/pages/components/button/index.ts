import { App, EachPage } from '../../../app';
import Common from '../common';

const app = getApp<App>();

interface Button {
  icon?: string;
  loading?: boolean;
  onTap?: string;
  shape?: Comp.ButtonShape;
  size?: Comp.ButtonSize;
  text: string;
  type?: Comp.ButtonType;
}

interface CardRow extends Partial<Button> {
  wrap?: boolean | Omit<Button, 'text'>;
  instances: Button[];
}

interface CardBody extends Button {
  id: number;
  rows: CardRow[];
}

interface Data {
  cards: CardBody[];
  navbarTitleVisible: boolean;
}

const filledButtons: Button[] = [
  { text: '普通' },
  { text: '推荐', type: 'primary' },
  { text: '危险', type: 'danger' },
];

const ghostButtons: Button[] = [
  { text: '推荐', type: 'ghost-primary' },
  { text: '危险', type: 'ghost-danger' },
  { text: '文字', type: 'ghost-href' },
];

const filledIconButtons: Button[] = [
  { icon: 'search', text: '' },
  { icon: 'heart', text: '', type: 'primary' },
  { icon: 'delete', text: '', type: 'danger' },
];

const ghostIconButtons: Button[] = [
  { icon: 'search', text: '', type: 'ghost-primary' },
  { icon: 'heart', text: '', type: 'ghost-danger' },
  { icon: 'delete', text: '', type: 'ghost-href' },
];

const sizeOptions: [Comp.ButtonSize, string][] = [
  ['large', '大型'],
  ['default', '中型'],
  ['small', '小型'],
  ['tiny', '微型'],
];

const sizeRadio: CardRow = {
  wrap: { size: 'small' },
  size: 'small',
  onTap: 'onChangeSize',
  instances: getSizeOptBtns(1).instances,
};

const groupedButton: Button[] = ['按钮', '组合', '示例'].map(text => ({ text }));

const cards: CardBody[] = [
  {
    id: 0,
    text: 'data-type 控制按钮六种类型，data-loading 控制加载态，点击页面内任一按钮即可预览加载态',
    rows: [
      { wrap: true, instances: filledButtons },
      { wrap: true, instances: ghostButtons },
      sizeRadio,
    ],
  },
  {
    id: 1,
    text: '圆形按钮，推荐使用图标代替文字',
    rows: [
      { wrap: true, shape: 'circle', instances: filledIconButtons },
      { wrap: true, shape: 'circle', instances: ghostIconButtons },
      sizeRadio,
    ],
  },
  {
    id: 2,
    text: '圆角按钮',
    rows: [
      { wrap: true, shape: 'round', instances: filledButtons },
      { wrap: true, shape: 'round', instances: ghostButtons },
      sizeRadio,
    ],
  },
  {
    id: 3,
    text: 'block 按钮，独占一行空间',
    rows: [
      { wrap: false, shape: 'block', instances: filledButtons },
      { wrap: false, shape: 'block', instances: ghostButtons },
      sizeRadio,
    ],
  },
  {
    id: 4,
    text: 'm-button-group 包裹按钮组合，可统一配置大小与类型，支持 round 形状',
    rows: [
      { wrap: {}, instances: groupedButton },
      { wrap: { type: 'primary', shape: 'round' }, instances: groupedButton },
      { wrap: { type: 'ghost-primary' }, instances: groupedButton },
      { wrap: { type: 'ghost-danger', shape: 'round' }, instances: groupedButton },
      sizeRadio,
    ],
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
    this.onLoadOne(query, '按钮').commit();
  },
  onTap(event: WXML.TapEvent<{ card: number; index: number; row: number }>) {
    const { card, index, row } = event.currentTarget.dataset;
    const key = `cards[${card}].rows[${row}].instances[${index}].loading`;
    this.setData({ [key]: true });
    setTimeout(() => this.setData({ [key]: false }), 3000);
  },
  onChangeSize(event: WXML.TapEvent<{ card: number; index: number; row: number }>) {
    const { card, index, row } = event.currentTarget.dataset;
    const { size, instances } = getSizeOptBtns(index);
    this.setData({
      [`cards[${card}].size`]: size,
      [`cards[${card}].rows[${row}].instances`]: instances,
    });
  },
});

function getSizeOptBtns(index: number) {
  return {
    size: sizeOptions[index][0],
    instances: sizeOptions.map<Button>((opt, ind) => ({
      text: opt[1],
      type: ind === index ? 'primary' : 'default',
    })),
  };
}
