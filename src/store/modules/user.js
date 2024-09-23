import { defineStore } from 'pinia';
import { store } from "@/store";
export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        token: null
    }),
    getters: {

    },
    actions: {
        setToken(token) {
            this.token = token
        },
        resetState() {
            this.token = null
        }
    }
});

export function useUserStoreWithOut() {
    return useUserStore(store);
}