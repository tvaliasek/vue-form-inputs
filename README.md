# Customized bootstrap vue form inputs for BS 5 and Vue 3

Wrapper components over most commonly used bootstrap vue form input components, with support for vuelidate, vue i18n and vue 3 datepicker. Input plugin automatically register required components from bootstrap-vue-next.2

Main goal is to simplify common bootstrap form design in my own projects.

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

#### Text, Textarea

and common props for all components

| prop | type | required | default | description |
|------|------|----------|---------|-------------|
| label | string | false | empty string | Input label text |
| type | string | false | 'text' | Input html attribute type |
| size | string | false | 'md' | Size of input - sm, md, lg |
| validationMessages | object | false | empty object | key - value pairs for validation messages |
| validation | object | false | empty object | vuelidate validation entry instance |
| disabled | boolean | false | false | Input html disabled attribute |
| modelValue | undefined | false | undefined | v-model value |
| hint | string | false | undefined | hint text for input displayed under form input |
| placeholder | string | false | undefined | input placeholder html attribute |
| formatter | function | false | undefined | function to apply on value as formatter | 
| renderAsGroup | boolean | false | false | toggle for input group rendering |
| id | string | false | undefined | Input html id attribute |
| readOnly | boolean | false | false | toggle for readonly attribute |

#### Select

| prop | type | required | default | description |
|------|------|----------|---------|-------------|
| options | array | true | undefined | [{ value: 'someValue', text: 'Some value' }] |
| multi | boolean | false | false | toggle for multiselect rendering |
| selectSize | number | false | undefined | set number of rows for multiselect |

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

## i18n

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
