# Customized bootstrap vue form inputs

Only usable for my internal projects, sorry.

## Install
``` sh
npm install @tvaliasek/vue-form-inputs

# peer dependencies
npm install bootstrap
npm install bootstrap-vue
```

``` js
import Vue from 'vue'
import { FormInputsPlugin } from '@tvaliasek/vue-form-inputs'
import '@tvaliasek/vue-form-inputs/dist/vueFormInputs.css'

Vue.use(FormInputsPlugin)

// or import individual components

/*
    FormInput
    FormInputDatePicker
    FormInputTextarea
    FormInputSelect
    FormInputRadioGroup
*/
```