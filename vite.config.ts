import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { resolve } from 'node:path'
import dts from 'vite-plugin-dts'
import { visualizer } from 'rollup-plugin-visualizer'


const customElements: string[] = [
//    'iconify-icon',
]

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: tag => customElements.includes(tag)
                }
            }
        }),
        vueDevTools(),
        dts({
            tsconfigPath: resolve(__dirname, 'tsconfig.declarations.json')
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
            fileName: format => `vue-form-inputs${(format !== 'es') ? `.${format}` : ''}.js`,
            formats: ['es', 'umd']
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
                    'vue': 'Vue',
                    '@vuepic/vue-datepicker': '@vuepic/vue-datepicker'
                },
                assetFileNames: 'vue-form-inputs.[ext]'
            }
        }

    }
})
