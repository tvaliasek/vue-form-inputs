/* eslint-disable import/no-unresolved */
import { fileURLToPath, URL } from 'node:url'
import Components from 'unplugin-vue-components/vite'
import { BootstrapVueNextResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import Icons from 'unplugin-icons/vite'
import IconsResolve from 'unplugin-icons/resolver'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Components({
            resolvers: [
                BootstrapVueNextResolver(),
                IconsResolve()
            ],
            dts: true
        }),
        Icons({
            compiler: 'vue3',
            autoInstall: true
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'src/lib-main.ts'),
            name: 'VueFormInputs',
            fileName: 'vue-form-inputs'
        },
        rollupOptions: {
            external: [
                'vue',
                'bootstrap',
                'bootstrap-vue-next',
                'vue',
                'vuelidate'
            ],
            output: {
                globals: {
                    vue: 'Vue'
                },
                assetFileNames: 'vue-form-inputs.[ext]'
            }
        }
    }
})
