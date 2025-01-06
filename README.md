# Customized bootstrap vue form inputs for BS 5 and Vue 3

Wrapper components over the most commonly used bootstrap input components with support for vuelidate, vue i18n and vue 3 datepicker. Originally based on bootstrap-vue-next components, but since version 4 without this dependency.

Main goal is to simplify common bootstrap form design in my own projects.

## Install
``` sh
npm install @tvaliasek/vue-form-inputs

# peer dependencies
npm install bootstrap
# for datepicker
npm install @vuepic/vue-datepicker
```

``` js
import { createApp } from 'vue'

import { FormInputsPlugin } from '@tvaliasek/vue-form-inputs'
import '@tvaliasek/vue-form-inputs/dist/vue-form-inputs.css'
import 'bootstrap/dist/css/bootstrap.css'

const app = createApp(App)

app.use(FormInputsPlugin())

// or import individual components

/*
    FormInput
    FormInputDatePicker
    FormInputTextarea
    FormInputSelect
    FormInputRadioGroup
    FormInputCheckbox
    FormInputCheckboxGroup
    FormInputFile
*/
```

## Usage, props and slots

### Basic usage example:

``` vue
<template>
    <!-- Common text input with validation -->
    <FormInput
        id="htmlId"
        label="Common text input"
        :validation="validations.example"
        v-model="example"
    />
</template>

<script setup>
import useVuelidate from '@vuelidate/core'
import { ref, computed } from 'vue'
import { required } from '@vuelidate/validators'

const example = ref('')
const validations = useVuelidate(computed(() => ({ example: { required } })), { example })
</script>

```

### Props

#### Common props for all components

| prop | type | required | default | description |
|------|------|----------|---------|-------------|
| label | string | false | empty string | Input label text |
| size | string | false | undefined | Size of input - sm, lg or not set |
| validationMessages | object | false | empty object | key - value pairs for validation messages |
| validation | object | false | empty object | vuelidate validation entry instance |
| disabled | boolean | false | false | Input html disabled attribute |
| modelValue | undefined | false | undefined | v-model value |
| hint | string | false | undefined | hint text for input displayed under form input |
| id | string | false | undefined | Input html id attribute |
| readOnly | boolean | false | false | toggle for readonly attribute |

#### Text

| prop | type | required | default | description |
|------|------|----------|---------|-------------|
| type | string | false | 'text' | Input html attribute type |
| placeholder | string | false | undefined | input placeholder html attribute |
| formatter | function | false | undefined | function to apply on value as formatter | 
| renderAsGroup | boolean | false | false | toggle for input group rendering, use slots default / append and prepend |
| lazyFormatter | boolean | false | true | control behaviour of formatter function |

#### Textarea

| prop | type | required | default | description |
|------|------|----------|---------|-------------|
| placeholder | string | false | undefined | input placeholder html attribute |
| formatter | function | false | undefined | function to apply on value as formatter |
| lazyFormatter | boolean | false | true | control behaviour of formatter function | 

#### Select

| prop | type | required | default | description |
|------|------|----------|---------|-------------|
| options | array | true | undefined | [{ value: 'someValue', text: 'Some value' }] |
| multi | boolean | false | false | toggle for multiselect rendering |
| selectSize | number | false | undefined | set number of rows for multiselect |
| placeholder | string | false | undefined | input placeholder html attribute |
| renderAsGroup | boolean | false | false | toggle for input group rendering, use slots default / append and prepend |

#### Radio group, Checkbox group

| prop | type | required | default | description |
|------|------|----------|---------|-------------|
| options | array | true | undefined | [{ value: 'someValue', text: 'Some value' }] |
| stacked | boolean | false | true | toggle to render inputs side by side |

#### Checkbox

| prop | type | required | default | description |
|------|------|----------|---------|-------------|
| renderAsSwitch | boolean | false | false | toggle to render input as switch |

#### Datepicker

Datepicker is wrapped [@vuepic/vue-datepicker](https://vue3datepicker.com/)

| prop | type | required | default | description |
|------|------|----------|---------|-------------|
| locale | string | false | cs-CZ | language code for Intl |
| minDate | Date | false | undefined | minimal date for calendar |
| maxDate | Date | false | undefined | maximal date for calendar |
| enableTime | boolean | false | false | toggle for date and time selection |
| ignoreTimeValidation | boolean | false | true | validate only date part |
| dateFormat | function | false | undefined | custom date formatter function |
| placeholder | string | false | undefined | input placeholder html attribute |
| enforceUtc | boolean | false | undefined | enforces UTC format |
| defaultTime | { hours: string \| number, minutes: string \| number, seconds: string \| number  } | false | undefined | sets default time |

#### File

| prop | type | required | default | description |
|------|------|----------|---------|-------------|
| multiple | boolean | false | false | set to true to enable multiple file selection |
| accept | string or string[] | false | [] | define list of extensions or mime type patterns allowed for selection, model value is automatically filtered using these patterns |

## i18n

If you want to automatically translate validation messages, you can use vue i18n, or custom function. Just add translations to your i18n instance and provide "t" function as below:  

``` ts
import { provide } from 'vue'
import { useI18n } from 'vue-i18n'
import { TRANSLATE_INJECTION_KEY } from '@tvaliasek/vue-form-inputs'

const { t } = useI18n()
provide<((message: string, params: Record<string, any>) => string)>(TRANSLATE_INJECTION_KEY, (message: string, params?: Record<string, any>) => t(message, params)) 

// for automatic translation of custom messages you could use $t: prefix
const v$ = useVuelidate({
    textInput: {
        required,
        minLength: minLength(4),
        custom: helpers.withMessage('$t:some.message', (value: string) => {
            return value === 'custom'
        })
    },
}, { textInput })

```

Add default translations to your i18n instance:

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
                "required": "This field must be filled.",
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
