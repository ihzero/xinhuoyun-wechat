

import { createPersistedState } from 'pinia-plugin-persistedstate';

export const PERSIST_KEY_PREFIX = 'SERVE_XINHUO_YUN';

export function registerPiniaPersistPlugin(pinia) {
  pinia.use(createPersistedState(createPersistedStateOptions(PERSIST_KEY_PREFIX)));
}


export function createPersistedStateOptions(keyPrefix) {
  return {
    storage: {
      getItem(key) {
        return uni.getStorageSync(key);
      },
      setItem(key, value) {
        uni.setStorageSync(key, value);
      }
    },
    key: (id) => `${keyPrefix}__${id}`
  };
}
