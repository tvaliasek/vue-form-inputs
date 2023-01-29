import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

import { FormInputsPlugin } from './lib-main.js'

const app = createApp(App)
const i18n = createI18n()

app.use(FormInputsPlugin)
app.use(i18n)

app.mount('#app')
