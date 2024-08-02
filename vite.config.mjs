/* eslint-disable import/no-unresolved */
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        dts({
            tsconfigPath: resolve(__dirname, 'tsconfig.declarations.json')
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
                '@vuepic/vue-datepicker'
            ],
            output: {
                globals: {
                    vue: 'Vue',
                    '@vuepic/vue-datepicker': '@vuepic/vue-datepicker'
                },
                assetFileNames: 'vue-form-inputs.[ext]'
            }
        }
    }
})
