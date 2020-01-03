export const DefaultSystemInfo: Readonly<GlobalSystemInfo> = {
  brand: '',
  model: '',
  pixelRatio: 2,
  screenWidth: 375,
  screenHeight: 667,
  windowWidth: 375,
  windowHeight: 667,
  statusBarHeight: 20,
  language: 'zh',
  version: '',
  system: '',
  platform: '',
  fontSizeSetting: 16,
  SDKVersion: '',
  benchmarkLevel: -1,
  safeArea: {
    bottom: 667,
    height: 647,
    left: 0,
    right: 375,
    top: 20,
    width: 375,
  },
  wechatMenu: {
    bottom: 58,
    height: 32,
    left: 278,
    right: 365,
    top: 26,
    width: 87,
  },
};

export const DefaultPxCssvar = {
  screenHeight: false,
  screenWidth: false,
  statusBar: true,
  sysNavbar: true,
  sysNavtop: true,
};

export const DefaultUIDeviceSetting: MP.UI.DeviceSetting = {
  screenHeight: 667,
  screenWidth: 375,
  statusBar: 20,
  sysNavbar: 44,
  sysNavtop: 64,
};

export const UIInternalSetting: MP.UI.InternalSetting = {
  IconfontUrl: false,
  NativeContainerBGColor: { light: '#f0f0f0', dark: '#000000' },
  NativeContainerBGText: { light: 'dark', dark: 'light' },
};

export const DefaultUIUserSetting: MP.UI.UserSetting = {
  mode: 'auto',
  os: 'ios',
  uilang: 'hig',
  animation: 'auto',
};
