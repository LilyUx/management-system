/**
 * @author xuling
 * @module storage 操作本地存儲sessionStorage
 * @method setValue
 * @method getValue
 * @method removeValue
 * @method clear 不傳參，清除所有sessionStorage
 */

function stringify(value: any): string {
  return JSON.stringify(value);
}

function parse<T>(value: string): T | null {
  try {
    return JSON.parse(value) as T;
  } catch (error) {
    return null;
  }
}

interface ISessionStorage {
  setValue(key: string, data: any): ISessionStorage;
  getValue<T>(key: string, defaultValue?: T): T | null;
  removeValue(key: string): ISessionStorage;
  clear: () => void;
}

const SessionStorage: ISessionStorage = {
  setValue(key: string, data: any): ISessionStorage {
    sessionStorage.setItem(key, stringify(data));
    return this;
  },
  getValue<T>(key: string, defaultValue?: T): T | null {
    const value = sessionStorage.getItem(key);
    if (!value) return defaultValue || null;
    const data = parse<T>(value);
    return data;
  },
  removeValue(key: string): ISessionStorage {
    sessionStorage.removeItem(key);
    return this;
  },
  clear() {
    sessionStorage.clear();
  },
};
export default SessionStorage;
