/* eslint-disable import/no-unresolved */
import { fileURLToPath, URL } from 'node:url'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Components({
            dts: true
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'VueFormInputs',
            fileName: 'vue-form-inputs'
        },
        rollupOptions: {
            external: [
                'vue',
                'bootstrap',
                'vuelidate',
                { '@vuepic/vue-datepicker': '@vuepic/vue-datepicker' }
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
