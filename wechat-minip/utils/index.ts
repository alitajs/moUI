import * as Const from './const';
import { default as Env } from './env';
import * as Storage from './storage';
import * as UI from './ui';
import * as Version from './version';

export { Const, Env, Storage, UI, Version };

export function dictHasDiff<T extends Record<string, any>, U extends Record<string, any>>(
  o1: T,
  o2: U,
) {
  return Object.keys(o1).some(k => o1[k] !== o2[k]);
}

export function dictDiff<T extends Record<string, any>, U extends Record<string, any>, V = {}>(
  o1: T,
  o2: U,
  fallback?: V,
): Partial<T> | V {
  const ret: Partial<T> = {};
  const diff = Object.keys(o1).filter(k => o1[k] !== o2[k]);
  if (!diff.length) return fallback ?? ret;
  diff.forEach((c: keyof T) => (ret[c] = o1[c]));
  return ret;
}

export function dictDiffPartial<
  T extends Record<string, any>,
  U extends Record<string, any>,
  V = Partial<T>
>(o1: T, o2: U, fallback?: V) {
  const ret: Partial<T> = {};
  const diffKeys = dictDiffPartialKeys(o1, o2);
  if (!diffKeys.length) return fallback ?? ret;
  diffKeys.forEach((c: keyof T) => (ret[c] = o1[c]));
  return ret;
}

export function dictDiffPartialKeys<T extends Record<string, any>, U extends Record<string, any>>(
  o1: T,
  o2: U,
) {
  return Object.keys(o1).filter(k => k in o2 && o1[k] !== o2[k]) as (keyof T)[];
}

export function pipeline<T extends (arg: any) => any, U, V, W, X, Y, Z>(
  arg: ArgsType<T>[0],
  _f1: T,
  _f2?: (ret: ReturnType<T>) => U,
  _f3?: (ret: U) => V,
  _f4?: (ret: V) => W,
  _f5?: (ret: W) => X,
  _f6?: (ret: X) => Y,
  _f7?: (ret: Y) => Z,
): U extends unknown
  ? ReturnType<T>
  : V extends unknown
  ? U
  : W extends unknown
  ? V
  : X extends unknown
  ? W
  : Y extends unknown
  ? X
  : Z extends unknown
  ? Y
  : Z {
  return [...arguments].slice(1).reduce((prev, curr) => curr(prev), arg);
}

export function monitorObject<T extends object>(
  initValue: T,
  onChange: (value: T, diff: Partial<T>) => void,
) {
  const value = { ...initValue } as T & {
    update: (next: Partial<T>, stopCall?: boolean) => boolean;
    reset: (stopCall?: boolean) => boolean;
  };
  Object.defineProperties(value, {
    update: {
      value: function(next: Partial<T>, stopCall: boolean = false) {
        const diff = dictDiffPartial(next, value, initValue);
        if (diff === initValue) return false;
        Object.assign(value, diff);
        if (!stopCall) onChange(value, diff);
        return true;
      },
    },
    reset: {
      value: function(stopCall: boolean = false) {
        return value.update(initValue, stopCall);
      },
    },
  });
  return value;
}

export function dictValues<T extends Record<string, any>>(
  dict: T,
): (T extends { [key: string]: infer U } ? U : any)[] {
  return Object.keys(dict).map(k => dict[k]);
}

export function navQueryNotFound(content: string = '无法获取当前页面') {
  wx.showModal({
    content,
    confirmText: '返回',
    showCancel: false,
    title: '提示',
    complete: () => wx.navigateBack({ delta: 1 }),
  });
}

export function truncate(
  str: string,
  len: number = 30,
  wideChar: boolean = true,
  omission: string = '...',
) {
  str = str.slice(0, len);
  const { length: plusLen } = wideChar ? str.match(/[^\u0000-\u0200]/g) || [] : [];
  if (str.length + plusLen < len) return str;
  if (omission.length > len) return omission.slice(omission.length - len);
  return `${str.slice(0, len - omission.length - plusLen / 2)}${omission}`;
}

export function timeBetween(from: number, to: number = Date.now()) {
  const passed = from < to;
  const suffix = passed ? '前' : '后';
  let diff = passed ? to - from : from - to;
  return diff < 1000
    ? '刚刚'
    : diff < 60000
    ? `${Math.trunc(diff / 1000)} 秒${suffix}`
    : diff < 3600000
    ? `${Math.trunc(diff / 60000)} 分钟${suffix}`
    : diff < 86400000
    ? `${Math.trunc(diff / 3600000)} 小时${suffix}`
    : diff < 2678400000
    ? `${Math.trunc(diff / 86400000)} 天${suffix}`
    : diff < 31536000000
    ? `${Math.trunc(diff / 2678400000)} 个月${suffix}`
    : `${Math.trunc(diff / 31536000000)} 年${suffix}`;
}

export function throttle<T extends (...args: any[]) => void>(func: T, timeFrame: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let currentArgs: ArgsType<T>;
  return function(...args: ArgsType<T>) {
    currentArgs = args;
    if (timeout !== null) return;
    timeout = setTimeout(() => {
      timeout = null;
      func(...currentArgs);
    }, timeFrame);
  };
}

export class BaseMutant<D = Record<string, any>> {
  protected next: Record<string, any> = {};
  protected onCommit?: (next: Record<string, any>) => void;

  constructor(onCommit?: (next: Record<string, any>) => boolean | void) {
    this.onCommit = onCommit;
  }

  update = <T extends string | keyof D | Record<string, any> | PowerPartial<D>>(
    key: T,
    value?: T extends keyof D ? D[T] : T extends string ? any : never,
  ) => {
    if (typeof key === 'string') this.next[key] = value;
    Object.assign(this.next, key);
    return this;
  };

  commit = () => {
    if (this.onCommit && this.onCommit({ ...this.next })) return this;
    this.flush();
    return this;
  };

  flush = () => {
    this.next = {};
    return this;
  };
}

export class DataMutant<D> extends BaseMutant<D> {
  page: Page.PageThis<D>;

  constructor(page: Page.PageThis) {
    super();
    this.page = page;
  }

  commit = (callback?: () => void) => {
    if (!Object.keys(this.next).length) return this;
    this.page.setData(this.next, callback);
    this.next = {};
    return this;
  };
}

export function SUUID(length: number = 32): string {
  if (length < 1) return '';
  const chunk = Math.random()
    .toString(36)
    .slice(2);
  return `${chunk}${SUUID(length - chunk.length)}`.slice(0, length);
}

export const NavbarLoading = {
  set: new Set<string>(),
  show: (identifier: string, timeout: number = 10) => {
    NavbarLoading.set.add(identifier);
    wx.showNavigationBarLoading({});
    setTimeout(() => NavbarLoading.hide(identifier), timeout * 1000);
  },
  hide: (identifier: string) => {
    if (!NavbarLoading.set.delete(identifier)) return;
    if (!NavbarLoading.set.size) wx.hideNavigationBarLoading({});
  },
};

export function createTask<T>() {
  const ref = {} as { resolve: (_value: T | PromiseLike<T>) => void; result?: T; task: Promise<T> };
  ref.task = new Promise<T>(resolve => (ref.resolve = resolve));
  return ref;
}

export function  querystring(query: Record<string, any> = {}) {
  const enc = encodeURIComponent;
  const keys = Object.keys(query);
  return keys
    .reduce<string[]>((prev, curr) => {
      const key = enc(curr);
      if (typeof query[curr] === 'boolean' && !query[curr]) return prev;
      if (typeof query[curr] === 'undefined' || query[curr] === null) return prev;
      if (!Array.isArray(query[curr])) return prev.concat(`${key}=${enc(query[curr])}`);
      return prev.concat(query[curr].map((value: any) => `${key}=${enc(`${value}`)}`));
    }, [])
    .join('&');
}
