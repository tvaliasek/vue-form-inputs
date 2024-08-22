/* eslint-disable import/no-unresolved */
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import dts from 'vite-plugin-dts'
import { writeFileSync } from 'node:fs'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        dts({
            tsconfigPath: resolve(__dirname, 'tsconfig.declarations.json'),
            beforeWriteFile: (filePath, content) => {
                writeFileSync('dist/index.d.mts', content)
                return {
                    filePath,
                    content
                }
            }
        }),
        visualizer()
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
