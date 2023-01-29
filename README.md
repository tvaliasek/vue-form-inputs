# Customized bootstrap vue form inputs for BS 5 and Vue 3

Wrapper components over most commonly used bootstrap vue form input components, with support for vuelidate, vue i18n and vue 3 datepicker. Input plugin automatically register required components from bootstrap-vue-next.

Primarily made for use in my own projects, sorry.

## Install
``` sh
npm install @tvaliasek/vue-form-inputs

# peer dependencies
npm install bootstrap
npm install bootstrap-vue-next
```

``` js
import { createApp } from 'vue'

import { FormInputsPlugin } from '@tvaliasek/vue-form-inputs'
import '@tvaliasek/vue-form-inputs/dist/vue-form-inputs.css'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

const app = createApp(App)

app.use(FormInputsPlugin)

// or import individual components, beware, using this method, no additional components from bs vue is registered

/*
    FormInput
    FormInputDatePicker
    FormInputTextarea
    FormInputSelect
    FormInputRadioGroup
    FormInputCheckbox
    FormInputCheckboxGroup
*/
```

If vue i18n is detected, please add these translations:

``` json
{
    "cs": {
        "vueFormInputs": {
            "feedback": {
                "required": "Toto pole je nutné vyplnit.",
                "minLength": "Hodnota musí být minimálně {minLength} znaků dlouhá.",
                "maxLength": "Hodnota musí být maximálně {maxLength} znaků dlouhá.",
                "minValue": "Hodnota musí být minimálně {minValue}.",
                "maxValue": "Hodnota musí být maximálně {maxValue}.",
                "between": "Hodnota musí být mezi {betweenMin} a {betweenMax}.",
                "alpha": "Jsou povoleny pouze písmena.",
                "alphaNum": "Jsou povoleny pouze písmena a čísla.",
                "numeric": "Jsou povoleny pouze čísla.",
                "integer": "Jsou povolena pouze celá čísla.",
                "decimal": "Jsou povolena pouze desetinná čísla.",
                "email": "Chybný formát emailové adresy.",
                "ipAddress": "Chybný formát IP adresy.",
                "macAddress": "Chybný formát MAC adresy.",
                "sameAs": "Hodnota není shodná.",
                "url": "Chybný formát URL adresy.",
                "validatedEmail": "Nefunkční nebo chybná emailová adresa.",
                "invalidValue": "Chybně vyplněná hodnota."
            }
        }
    },
    "en": {
        "vueFormInputs": {
            "feedback": {
                "required": "This field must be completed.",
                "minLength": "The value must be at least {minLength} characters long.",
                "maxLength": "The value must be at most {maxLength} characters long.",
                "minValue": "The value must be at least {minValue}.",
                "maxValue": "The value must be at most {maxValue}.",
                "between": "The value must be between {betweenMin} and {betweenMax}.",
                "alpha": "Only letters are allowed.",
                "alphaNum": "Only letters and numbers are allowed.",
                "numeric": "Only numbers are allowed.",
                "integer": "Only whole numbers are allowed.",
                "decimal": "Only decimal numbers are allowed.",
                "email": "Incorrect email address format.",
                "ipAddress": "Incorrect IP address format.",
                "macAddress": "Incorrect MAC address format.",
                "sameAs": "The values are not identical.",
                "url": "Incorrect URL address format.",
                "validatedEmail": "Broken or incorrect email address.",
                "invalidValue": "Incorrectly filled value."
            }
        }
    }
}
```
