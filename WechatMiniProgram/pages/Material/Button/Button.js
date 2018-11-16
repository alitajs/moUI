import { PageFun, Button } from '../Material';
const button = new Button({
  block: true,
  wxml: { a: 1 },
  size: 'small',
  circle: true,
  icon: 'delete',
  noShadow: true,
  outlined: false,
  content: 'CONFIRM',
  namespace: 'button.a',
  className: [],
  style: {
    'line-height': '24px',
  },
  onTap: (event, page) =>
    console.log(event, page, this),
});

Page({
  data: {
    ...button.initData(),
  },
  mt: {
    ...button.initMt(),
  },
  ...PageFun(),
  onShareAppMessage() { },
  onLoad: function () {
    button.addClassName('mt-hello-world');
    button.removeStyle('line-height');
    button.setData('content', '');
    button.update(this);
    setTimeout(() => {
      button.removeClassName('mt-sma');
      button.update();
      setTimeout(() => {
        button.addClassName('mt-lar');
        button.update();
      }, 2000);
    }, 2000);
  },
});

