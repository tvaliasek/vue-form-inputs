import { createApp } from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import { FormInputsPlugin } from './lib-main.js'

const app = createApp(App)

app.use(FormInputsPlugin)

app.mount('#app')
