export enum StorageKeys {
  ACCESS_TOKEN = 'access-token',
}

class Storage {
  setString(key: string, value: string) {
    if (!window.localStorage) {
      return;
    }
    window.localStorage.setItem(key, value);
  }

  setObject<T = unknown>(key: string, value: T) {
    if (!window.localStorage) {
      return;
    }
    try {
      const lsValue = JSON.stringify(value);
      window.localStorage.setItem(key, lsValue);
    } catch (error) {
      console.error(`${key} LOCAL STORAGE SAVE ERROR`, error);
    }
  }

  getString(key: string, defaultValue: string) {
    if (typeof window !== 'undefined') {
      if (!window.localStorage) {
        return defaultValue;
      }
      try {
        const res = window.localStorage.getItem(key);
        if (res === null) return defaultValue;
        return res;
      } catch (error) {
        console.error(`${key} LOCAL STORAGE PARSE ERROR`, error);
        return defaultValue;
      }
    }
    return defaultValue;
  }

  getObject<T = unknown>(key: string, defaultValue: T): T {
    if (typeof window !== 'undefined') {
      if (!window.localStorage) {
        return defaultValue;
      }
      const lsValue = window.localStorage.getItem(key);
      if (!lsValue) {
        return defaultValue;
      }
      try {
        const store = JSON.parse(lsValue);
        if (!store) {
          return defaultValue;
        }
        return store;
      } catch (error) {
        console.error(`${key} LOCAL STORAGE PARSE ERROR`, error);
        return defaultValue;
      }
    }

    return defaultValue;
  }

  removeStorage(key: string) {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key);
    }
  }
}

export default new Storage();
