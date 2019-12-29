import * as Version from './version';

export enum Key {
  Version = 'version',
  UIExternalSetting = 'WHG7z8w7',
}

export class Local {
  static Keys: Set<string>;

  static onMPVersionChange: MP.OnVersionChangeCallback = async current => {
    await Local.migrateStorage();
    Local.cacheMPVersion(current);
  };

  private static LoadKeysTask: Promise<any> | null = new Promise(res =>
    wx.getStorageInfo({
      success: ({ keys }) => (Local.Keys = new Set(keys)),
      complete: () => res((Local.LoadKeysTask = null)),
    }),
  );

  private static cacheMPVersion = (currentVersion: MP.Version) =>
    wx.setStorage({ key: Key.Version, data: currentVersion });

  private static migrateStorage = async () => {
    if (Local.LoadKeysTask !== null) await Local.LoadKeysTask;
    const nextKeyMap = { ...Key };
    const previousKeys = new Set(Local.Keys);
    Local.Keys.clear(); /** keep the object reference */
    const nextKeys = Object.keys(nextKeyMap).map(
      name => nextKeyMap[name as keyof typeof nextKeyMap],
    );
    nextKeys.forEach(key => {
      previousKeys.delete(key);
      Local.Keys.add(key);
    });
    previousKeys.forEach(key => wx.removeStorage({ key }));
  };
}

Version.onMPVersionChange(Local.onMPVersionChange, 0);
