import Vue from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuelidate from 'vuelidate'
import { FormInputsPlugin } from './index.js'

Vue.config.productionTip = false

Vue.use(FormInputsPlugin)
Vue.use(Vuelidate)

new Vue({
    render: h => h(App)
}).$mount('#app')
