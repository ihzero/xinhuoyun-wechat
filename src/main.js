import {
    createSSRApp
} from "vue";
import { setupStore } from '@/store';
import 'virtual:uno.css'
import App from "./App.vue";
export function createApp() {
    const app = createSSRApp(App);
    setupStore(app);
    return {
        app,
    };
}
