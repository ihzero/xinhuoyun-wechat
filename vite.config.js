import { defineConfig, loadEnv } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import UnoCSS from 'unocss/vite'
import { resolve } from 'path';
import TransformPages from './transform-pages.js'

export default defineConfig(({ mode, command }) => {
    const env = loadEnv(mode, process.cwd());
    return {
        plugins: [
            uni(),
            UnoCSS()
        ],
        define: {
            ROUTES: new TransformPages().routes
        },
        css: {
            preprocessorOptions: {
                scss: {
                    silenceDeprecations: ["legacy-js-api"]
                },
            },
        },
        resolve: {
            alias: {
                '@': resolve(__dirname, './src'),
            },
        },
        server: {
            proxy: {
                [env.VITE_COMMON_API_PREFIX]: {
                    target: env.VITE_COMMON_API_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(new RegExp('^' + env.VITE_COMMON_API_PREFIX), '')
                }

            }
        }
    }
});
