export default class Env {
  sys: GlobalSystemInfo;
  iOS = this.cache(
    () => /ios/.test(this.sys.system.toLowerCase()),
    () => this.sys.system,
  );

  constructor(sys: GlobalSystemInfo) {
    this.sys = sys;
  }

  cache<T extends (...args: any[]) => any>(self: T, identifier?: (...args: ArgsType<T>) => any): T {
    const store = new Map();
    return function() {
      const args = [...arguments] as ArgsType<T>;
      const id = identifier ? identifier(...args) : args[0];
      let cache: ReturnType<T> = store.get(id);
      if (!cache) store.set(id, (cache = self(...args)));
      return cache;
    } as T;
  }
}
