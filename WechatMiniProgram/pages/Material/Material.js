/**
  * moUI - Material
  * 2018/11/16
  * Version: 0.1.0
  * Mail: moui@moapi.cn
**/
const Utils = {
  QS: {
    stringify(obj, encodeUrl = true, sort = false, sortFun = null) {
      const keys = Object.keys(obj); if (sort) keys.sort(sortFun);
      if (encodeUrl) return keys.map(k =>
        `${k}=${encodeURIComponent(obj[k] || '')}`).join('&');
      else return keys.map(k => `${k}=${obj[k] || ''}`).join('&');
    },

    parse(qs, decodeUrl = true, json = false) {
      let obj = new Object(), fun;
      if (decodeUrl && json) fun = ([k, v]) => {
        v = decodeURIComponent(v || '');
        try { v = JSON.parse(v) }
        catch (e) { console.log(e) }
        Object.assign(obj, { [k]: v });
      };
      else if (decodeUrl) fun = ([k, v]) =>
        Object.assign(obj, { [k]: decodeURIComponent(v || '') });
      else if (json) fun = ([k, v]) => {
        try { v = JSON.parse(v || '') }
        catch (e) { console.log(e) }
        Object.assign(obj, { [k]: v });
      };
      else fun = ([k, v]) => Object.assign(obj, { [k]: v });
      qs.split('&').map(p => p.split('=')).map(fun); return obj;
    },
  },

  randomStr() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  },

  UUID(length = 32, join = '') {
    const sec = join.length + 4;
    const num = Math.ceil(length / sec);
    return Array.from({ length: num })
      .map(this.randomStr).join(join).slice(0, length);
  },

  parseKey(keyArr, obj = new Object(), index = 0) {
    if (index >= keyArr.length) return obj;
    let res = new Object();
    res[keyArr[index]] = Utils.parseKey(keyArr, obj, index + 1);
    return res;
  },

  fromKey(keyArr, obj = new Object(), index = 0) {
    if (index >= keyArr.length) return obj;
    return Utils.fromKey(keyArr, obj[keyArr[index]], index + 1);
  },

  copyObj(obj) {
    let res = new Object();
    Object.keys(obj).forEach(k =>
      Object.assign(res, { [k]: obj[k] }));
    return res;
  },
};

const PageFun = () => ({
  mtTouch: function (event) {
    let type = event.type.replace('touch', '');
    type = `onTouch${type[0].toUpperCase()}${type.slice(1)}`;
    const { currentTarget: { dataset: { namespace } } } = event;
    if (!!!namespace)
      return console.warn(`MT|pageFun|mtTouch: Without namespace.`);
    if (typeof this.mt !== 'object' || !this.mt[namespace]) return;
    if (typeof this.mt[namespace][type] === 'function')
      this.mt[namespace][type](event, this);
  },
  mtTap: function (event) {
    const type = event.type === 'bindtap' ? 'onTap' : 'onLongPress';
    const { currentTarget: { dataset: { namespace } } } = event;
    if (!!!namespace)
      return console.warn(`MT|pageFun|mtTap: Without namespace.`);
    if (typeof this.mt !== 'object' || !this.mt[namespace]) return;
    if (typeof this.mt[namespace][type] === 'function')
      this.mt[namespace][type](event, this);
  },
  mtAnimation: function (event) {
    let type = event.type.replace('animation', '');
    if (type === 'transitionend') type = 'onTransitionEnd';
    else type = `onAnimation${type[0].toUpperCase()}${type.slice(1)}`;
    const { currentTarget: { dataset: { namespace } } } = event;
    if (!!!namespace)
      return console.warn(`MT|pageFun|mtLongPress: Without namespace.`);
    if (typeof this.mt !== 'object' || !this.mt[namespace]) return;
    if (typeof this.mt[namespace][type] === 'function')
      this.mt[namespace][type](event, this);
  },
});

const rippleFun = ({
  onTouchStart = () => { },
}) => function (event, page) {
  const data = this.getData(page);
  const { currentTarget, touches, timeStamp } = event;
  const { offsetLeft, offsetTop } = currentTarget;
  if (data.hideRipple)
    return onTouchStart.call(this, event, page);
  const touArr = touches.map(({ pageX, pageY }) => ({
    timeStamp,
    touch: [pageX - offsetLeft, pageY - offsetTop],
  }));
  let rmNum = 0, { Ripple } = data;
  if (!Array.isArray(Ripple)) Ripple = new Array();
  Ripple.forEach((v, i) => rmNum =
    timeStamp - v.timeStamp < 500 ? rmNum : i + 1);
  Ripple.splice(0, rmNum);
  this.setData({ Ripple: Ripple.concat(touArr) });
  this.update(this);
  onTouchStart.call(this, event, page);
};

class Component {
  _className = new Set(); _data = new Map();
  _style = new Map(); classNameMap = new Object();
  constructor({
    style = new Map(), className = new Map(),
    namespace, page = null, wxml = null, ...pageFun,
  } = {}) {
    Object.keys(pageFun).forEach(k =>
      pageFun[k] = pageFun[k].bind(this));
    Object.keys(style).forEach(k =>
      this._style.set(k, style[k]));
    Object.assign(this, { namespace, page, _mt: pageFun });
    this.addClassName(...className);
    this.setData({ namespace, wxml });
    this.addStyle(); this.addClassName();
  }

  initData(...arg) {
    this.setData(...arg);
    const { _data, namespace } = this;
    let data = new Object();
    _data.forEach((v, k) => data[k] = v);
    data = Utils.parseKey(namespace.split('.'), data);
    this._data.clear(); return data;
  }

  setData(key, value) {
    if (key instanceof Map)
      key.forEach((v, k) => this._data.set(k, v));
    else if (typeof key === 'string')
      this._data.set(key, value);
    else if (key instanceof Object)
      Object.keys(key).forEach(k =>
        this._data.set(k, key[k]));
  }

  getData(page = this.page, key = null) {
    if (this.page === null) this.bindPage(page);
    if (key === null)
      return Utils.fromKey(this.namespace.split('.'), page.data);
    return Utils.fromKey(`${this.namespace}.${key}`.split('.'), page.data);
  }

  initMt(...arg) {
    this.setMt(...arg);
    const { _mt, namespace } = this;
    const mt = { [namespace]: Utils.copyObj(_mt) };
    this._mt = new Object(); return mt;
  }

  setMt(key, value) {
    if (key instanceof Map)
      key.forEach((v, k) => this._mt[k] = v);
    else if (typeof key === 'string')
      this._mt[key] = value;
    else if (key instanceof Object)
      Object.assign(this._mt, key);
  }

  getMt(page = this.page, key = null) {
    if (this.page === null) this.bindPage(page);
    if (key === null)
      return this.page.mt[this.namespace];
    return Utils.fromKey(key.split('.'), this.page.mt[this.namespace]);
  }

  bindPage = (page) =>
    this.page = page;

  update(page = this.page) {
    let data = new Object();
    const { _mt, _data, namespace } = this;
    if (this.page === null) this.bindPage(page);
    _data.forEach((v, k) => data[`${namespace}.${k}`] = v);
    this.page.setData(data); this._data.clear();
    if (typeof this.page.mt[namespace] !== 'object')
      this.page.mt[namespace] = new Object();
    Object.assign(this.page.mt[namespace], Utils.copyObj(_mt));
    this._mt = new Object();
  }

  formatClassName = () =>
    Array.from(this._className.values()).join(' ')

  formatStyle = () =>
    Array.from(this._style.keys()).map(k =>
      `${k}:${this._style.get(k)}`).join(';')

  addClassName(...className) {
    className.forEach(k => this._className.add(k));
    this._data.set('className', this.formatClassName());
  }

  removeClassName(...className) {
    className.forEach(k => this._className.delete(k));
    this._data.set('className', this.formatClassName());
  }

  addStyle(style = new Map(), value) {
    if (style instanceof Map)
      style.forEach((v, k) => this._style.set(k, v));
    else if (style instanceof String)
      this._style.set(style, value);
    else if (style instanceof Object)
      Object.keys(style).forEach(k => this._style.set(k, style[k]));
    this._data.set('style', this.formatStyle());
  }

  removeStyle(...style) {
    style.forEach(k => this._style.delete(k));
    this._data.set('style', this.formatStyle());
  }

  initClassName = (obj, ...className) =>
    this.addClassName(...Object.keys(obj).map(k =>
      this.classNameMap[k].get(obj[k])), ...className)
};

class Button extends Component {
  classNameMap = {
    circle: new Map([[true, 'mt-cir'], [false, '']]),
    outlined: new Map([[true, 'mt-otl'], [false, '']]),
    noShadow: new Map([[true, 'mt-nos'], [false, '']]),
    block: new Map([[true, 'mt-blo'], [false, 'mt-inb']]),
    size: new Map([['small', 'mt-sma'], ['large', 'mt-lar'], ['default', '']]),
    type: new Map([['normal', 'mt-nrm'], ['danger', 'mt-dan'], ['primary', '']]),
  };

  constructor({
    style = {}, page = null, icon = null, wxml = null, content = '',
    block = false, formType = '', openType = '', circle = false,
    className = [], size = 'default', type = 'primary', disabled = false,
    noShadow = false, outlined = false, hideRipple = false, namespace = 'Button', ...pageFun,
  } = {}) {
    pageFun.onTouchStart = rippleFun(pageFun);
    icon = icon ? `icon icon-${icon}` : undefined;
    super({ namespace, page, style, className, wxml, ...pageFun });
    this.setData({ content, formType, openType, disabled, hideRipple });
    this.initClassName({ type, circle, size, outlined, block, noShadow }, icon);
  }

}

class Color { };

export {
  Utils,
  PageFun,
  Component,
  Button,
};
