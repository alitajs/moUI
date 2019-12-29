declare namespace MP {
  interface Version {
    major: number;
    minor: number;
    patch: number;
  }

  const enum VersionChangeType {
    NotChange,
    Upgrade,
    Rollback,
  }

  interface VersionMeta extends Record<string, any> {}

  type OnVersionChangeCallback = (
    current: Version,
    last: Version,
    meta: VersionMeta,
  ) => void | Promise<void>;

  namespace Settings {
    const enum Key {
      UI = 'UI',
    }

    interface Meta<T extends JSONDumpable> {
      version: string;
      value: T;
    }
  }

  namespace UI {
    type ThemeMode = 'light' | 'dark';

    interface DeviceSetting {
      screenHeight: number;
      screenWidth: number;
      statusBar: number;
      sysNavbar: number;
      sysNavtop: number;
    }

    interface UserSetting {
      os: 'ios' | 'android';
      uilang: 'hig' | 'material';
      mode: ThemeMode | 'auto';
      animation: boolean | 'auto';
    }

    interface ExternalSetting extends DeviceSetting, UserSetting {}

    interface InternalSetting extends Record<string, any> {
      IconfontUrl: string | false;
      NativeContainerBGColor: string | { [key in ThemeMode]: string };
      NativeContainerBGText: ThemeMode | { [key in ThemeMode]: ThemeMode };
    }
  }
}
