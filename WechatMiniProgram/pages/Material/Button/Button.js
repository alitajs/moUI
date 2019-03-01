import { PageFun, Button } from '../Material';
const style = { 'margin-left': '8px' };
const buttonA = new Button({
  content: 'Default',
  namespace: 'buttonA',
});
const buttonB = new Button({
  style,
  type: 'normal',
  content: 'Normal',
  namespace: 'buttonB',
});
const buttonC = new Button({
  style,
  type: 'danger',
  content: 'Danger',
  namespace: 'buttonC',
});
const buttonD = new Button({
  outlined: true,
  LoadingBar: true,
  content: 'Default',
  namespace: 'buttonD',
});
const buttonE = new Button({
  style,
  outlined: true,
  type: 'normal',
  content: 'Normal',
  namespace: 'buttonE',
  LoadingBar: {
    duration: 2.4,
  },
});
const buttonF = new Button({
  style,
  outlined: true,
  type: 'danger',
  content: 'Danger',
  namespace: 'buttonF',
  LoadingBar: {
    position: 'top',
  },
});
const buttonG = new Button({
  block: true,
  content: 'Click Me!',
  namespace: 'buttonG',
  onTap: function (event, page) {
    this.setData({
      icon: 'check',
      content: 'Complete',
    }, true, page);
  },
});
const buttonH = new Button({
  block: true,
  disabled: true,
  content: 'Disabled',
  namespace: 'buttonH',
});
const buttonI = new Button({
  noShadow: true,
  content: 'noShadow',
  namespace: 'buttonI',
});
const buttonJ = new Button({
  style,
  noShadow: true,
  icon: 'search',
  content: 'With Icon',
  namespace: 'buttonJ',
});
const buttonK = new Button({
  circle: true,
  type: 'normal',
  size: 'small',
  icon: 'delete',
  namespace: 'buttonK',
});
const buttonL = new Button({
  style,
  circle: true,
  size: 'default',
  icon: 'star',
  type: 'danger',
  namespace: 'buttonL',
});
const buttonM = new Button({
  style,
  circle: true,
  size: 'large',
  icon: 'folderAdd',
  namespace: 'buttonM',
});

let data = {}, mt = {};
[buttonA, buttonB, buttonC, buttonD, buttonE, buttonF, buttonG,
  buttonH, buttonI, buttonJ, buttonK, buttonL, buttonM]
  .forEach(c => (Object.assign(data, c.initData()), Object.assign(mt, c.initMt())));

Page({
  data, mt,
  ...PageFun(),
  onShareAppMessage() { },
});
