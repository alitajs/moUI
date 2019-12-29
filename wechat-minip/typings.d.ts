declare type PowerPartial<T> = { [K in keyof T]: PowerPartial<T[K]> };

declare type ArgsType<T extends (...a: any[]) => any> = T extends (...a: infer U) => any ? U : any;

declare type JSONDumpable =
  | null
  | number
  | boolean
  | string
  | JSONDumpable[]
  | { [key: string]: JSONDumpable };

declare interface GlobalSystemInfo extends wx.GetSystemInfoSuccessCallbackResult {
  wechatMenu: wx.Rect;
  battery?: wx.GetBatteryInfoSuccessCallbackResult;
}

declare namespace Page {
  interface PageThis<D extends IAnyObject = any, T extends IAnyObject = any>
    extends Required<PageInstanceBaseProps<D>>,
      Omit<PageInstance<D, T>, keyof PageInstanceBaseProps<D>> {}
}

declare const enum TimeUnit {
  Millisecond,
  Second,
  Minute,
  Hour,
  Day,
  Month,
}

declare const enum TimeUnitInSeconds {
  Millisecond = 0.001,
  Second = 1,
  Minute = 60,
  Hour = 3600,
  Day = 86400,
  Month = 2592000,
}
