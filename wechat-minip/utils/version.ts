import * as Storage from './storage';

export function compare(current: MP.Version, last: MP.Version): MP.VersionChangeType {
  if (current.major !== last.major)
    return current.major < last.major
      ? MP.VersionChangeType.Rollback
      : MP.VersionChangeType.Upgrade;
  if (current.minor !== last.minor)
    return current.minor < last.minor
      ? MP.VersionChangeType.Rollback
      : MP.VersionChangeType.Upgrade;
  if (current.patch !== last.patch)
    return current.patch < last.patch
      ? MP.VersionChangeType.Rollback
      : MP.VersionChangeType.Upgrade;
  return MP.VersionChangeType.NotChange;
}

export function parse(versionStr: string): MP.Version | undefined {
  const matchRes = versionStr.trim().match(/^[^\d]*(\d*)(?:\.(\d*))?(?:\.(\d*))?$/);
  const version = matchRes?.slice(1, 4).map(mark => (mark ? parseInt(mark) : 0));
  return version && { major: version[0], minor: version[1], patch: version[2] };
}

export function stringify(version: MP.Version, prefix: string = '') {
  return `${prefix}${version.major}.${version.minor}.${version.patch}`;
}

export const OnMPUpgradeCallbackQueue = new Map<MP.OnVersionChangeCallback, number>();

export const OnMPRollbackCallbackQueue = new Map<MP.OnVersionChangeCallback, number>();

export function onMPRollback(callback: MP.OnVersionChangeCallback, weight: number = 1) {
  if (weight < 0) console.warn('the weight of `OnMPVersionChangeCallback` SHOULD NOT less than 0');
  OnMPRollbackCallbackQueue.set(callback, weight);
}

export function onMPUpgrade(callback: MP.OnVersionChangeCallback, weight: number = 1) {
  if (weight < 0) console.warn('the weight of `OnMPVersionChangeCallback` SHOULD NOT less than 0');
  OnMPUpgradeCallbackQueue.set(callback, weight);
}

export function onMPVersionChange(callback: MP.OnVersionChangeCallback, weight: number = 1) {
  if (weight < 0) console.warn('the weight of `OnMPVersionChangeCallback` SHOULD NOT less than 0');
  OnMPUpgradeCallbackQueue.set(callback, weight);
  OnMPRollbackCallbackQueue.set(callback, weight);
}

export function applyMPVersion(current: MP.Version, meta: MP.VersionMeta) {
  return new Promise<any>((success, fail) =>
    wx.getStorage({ key: Storage.Key.Version, success, fail }),
  )
    .then((r: { data: MP.Version }) => [compare(current, r.data), r.data] as const)
    .catch(() => [MP.VersionChangeType.Upgrade, parse('0')!] as const)
    .then(([changeType, last]) =>
      changeType === MP.VersionChangeType.Upgrade
        ? applyMPUpgrade(current, last, meta)
        : changeType === MP.VersionChangeType.Rollback
        ? applyMPRollback(current, last, meta)
        : void 0,
    );
}

async function applyMPRollback(current: MP.Version, last: MP.Version, meta: MP.VersionMeta) {
  const tasks = [...OnMPRollbackCallbackQueue.entries()]
    .sort((left, right) => right[1] - left[1])
    .map(([callback, _weight]) => callback(current, last, meta));
  await Promise.all(tasks);
}

async function applyMPUpgrade(current: MP.Version, last: MP.Version, meta: MP.VersionMeta) {
  const tasks = [...OnMPUpgradeCallbackQueue.entries()]
    .sort((left, right) => right[1] - left[1])
    .map(([callback, _weight]) => callback(current, last, meta));
  await Promise.all(tasks);
}
