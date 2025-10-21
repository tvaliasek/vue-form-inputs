# Customized bootstrap vue form inputs for BS 5 and Vue 3

Wrapper components over the most commonly used bootstrap input components with support for vuelidate, vue i18n and vue 3 datepicker. Originally based on bootstrap-vue-next components, but since version 4 without this dependency.

Main goal is to simplify common bootstrap form design in my own projects.

## Install
```sh
npm install @tvaliasek/vue-form-inputs

# peer dependencies
npm install bootstrap
# for datepicker
npm install @vuepic/vue-datepicker
```

```ts
import { createApp } from 'vue'
import { FormInputsPlugin } from '@tvaliasek/vue-form-inputs'
import '@tvaliasek/vue-form-inputs/dist/vue-form-inputs.css'
import 'bootstrap/dist/css/bootstrap.css'

const app = createApp(App)
app.use(FormInputsPlugin())
```

Or import only what you need:

```vue
<script setup lang="ts">
import { FormInput, FormInputSelect } from '@tvaliasek/vue-form-inputs'
</script>
```

## Components overview

| Component | Purpose | v-model type |
|-----------|---------|--------------|
| `FormInput` | Text inputs (text, email, number, etc.) | `string | number` |
| `FormInputTextarea` | Multi-line text | `string` |
| `FormInputSelect` | Single or multi select | `string | number | boolean | null | (Array<...>)` |
| `FormInputRadioGroup` | Radio buttons | `string | number | boolean | null` |
| `FormInputCheckbox` | Single checkbox / switch | `boolean` |
| `FormInputCheckboxGroup` | Multiple checkboxes / switches | `Array<string | number | boolean | null>` |
| `FormInputDatePicker` | Date / date-time picker (@vuepic/vue-datepicker) | `Date` |
| `FormInputDatePickerAlt` | Alternate simplified date picker | `Date` |
| `FormInputFile` | File input (single/multiple) with filtering | `File | File[]` |

All components unify validation state, label composition and feedback rendering.

## Events

| Event | Meaning | Payload |
|-------|---------|---------|
| `update:modelValue` | v-model update | new value |
| `change` | User commits a change | current value |
| `update` | Intermediate update while typing (where applicable) | current value |
| `blur` | Input loses focus | current value |

`FormInputFile` emits `update:modelValue`, `change`, `blur`.

## Slots

| Slot | Components | Description |
|------|------------|-------------|
| `label` | all | Override entire label contents |
| `label-prepend` | all | Insert before label text |
| `label-text` | all | Replace only text portion |
| `label-append` | all | Insert after label text |
| `invalid-feedback` | all | Override validation feedback node (normally auto) |
| `input-text` | all | Extra help text under input (besides `hint`) |
| `prepend` | inputs with `renderAsGroup` (text, select, file) | Input group prepend |
| `append` | inputs with `renderAsGroup` (text, select, file) | Input group append |
| default (checkbox when slot used) | checkbox | Custom label content for single checkbox |

Input group example:

```vue
<FormInput v-model="amount" type="number" label="Amount" :renderAsGroup="true">
    <template #prepend><span class="input-group-text">€</span></template>
    <template #append><button class="btn btn-outline-secondary" @click="amount=0">Reset</button></template>
</FormInput>
```

Custom composed label example:

```vue
<FormInput v-model="name" label="Name">
    <template #label-prepend><span class="me-1 bi bi-person" /></template>
    <template #label-append><small class="text-muted">(required)</small></template>
</FormInput>
```

## Basic usage example

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

### Common props (all components)

| prop | type | required | default | description |
|------|------|----------|---------|-------------|
| label | string | false | '' | Input label text |
| size | 'sm' | 'lg' | false | undefined | Bootstrap size variant |
| validationMessages | object | false | {} | Key-value custom validation messages |
| validation | vuelidate validation entry | false | {} | Vuelidate validation instance |
| disabled | boolean | false | false | Disabled attribute |
| modelValue | any | false | undefined | Bound v-model value |
| hint | string | false | undefined | Static hint text under input |
| id | string | false | auto | Input id (auto-generated if absent) |
| readOnly | boolean | false | false | Readonly attribute |
| showAsRequired | boolean | false | auto | Force required styling regardless of validation rules |
| name | string | false | undefined | Native name attribute (where applicable) |
| renderAsGroup | boolean | false | false | Input group layout (where supported) |
| autocomplete | string | false | undefined | Native autocomplete (text) |
| modelModifiers | object | false | undefined | Vue model modifiers: `{ lazy, trim, number }` |

### `FormInput` props

| prop | type | required | default | description |
|------|------|----------|---------|-------------|
| type | string | false | 'text' | Input type |
| placeholder | string | false | undefined | Placeholder attribute |
| formatter | (value: string, event: Event) => string | false | undefined | Value transform function |
| lazyFormatter | boolean | false | true | Delay formatting until blur |
| renderAsGroup | boolean | false | false | Enable `prepend` / `append` slots |
| autocomplete | string | false | undefined | Native autocomplete |

Formatting example:
```vue
<FormInput v-model="code" label="Code" :formatter="v=>v.toUpperCase()" :lazyFormatter="false" />
```

### `FormInputTextarea` props

| prop | type | required | default | description |
|------|------|----------|---------|-------------|
| rows | number | false | undefined | Rows attribute |
| placeholder | string | false | undefined | Placeholder |
| formatter | function | false | undefined | Value transform |
| lazyFormatter | boolean | false | true | Delay formatting until blur |

### `FormInputSelect` props

| prop | type | required | default | description |
|------|------|----------|---------|-------------|
| options | array | true | [] | `[{ value, text, disabled? }]` |
| multi | boolean | false | false | Multi-select mode |
| selectSize | number | false | undefined | Height (rows) in multi-select |
| placeholder | string | false | undefined | Placeholder; if provided and no empty option exists, inserted as disabled option |
| renderAsGroup | boolean | false | false | Enable input group layout |
| name | string | false | undefined | Native select name |

### `FormInputRadioGroup` props

| prop | type | required | default | description |
|------|------|----------|---------|-------------|
| options | array | true | [] | `[{ value, text }]` |
| stacked | boolean | false | true | Vertical layout; `false` renders inline |

### `FormInputCheckboxGroup` props

| prop | type | required | default | description |
|------|------|----------|---------|-------------|
| options | array | true | [] | `[{ value, text }]` |
| stacked | boolean | false | true | Vertical vs inline |
| renderAsSwitch | boolean | false | false | Switch style variant |

### `FormInputCheckbox` props

| prop | type | required | default | description |
|------|------|----------|---------|-------------|
| label | string | false | '' | Label text (ignored if label slot used) |
| renderAsSwitch | boolean | false | false | Switch style |

Custom label:
```vue
<FormInputCheckbox v-model="agree">
    <template #label>I agree to the <a href="/terms">Terms</a>.</template>
</FormInputCheckbox>
```

### `FormInputDatePicker` props

Datepicker wraps [@vuepic/vue-datepicker](https://vue3datepicker.com/).

| prop | type | required | default | description |
|------|------|----------|---------|-------------|
| locale | string | false | 'cs-CZ' | Locale string |
| minDate | Date | false | undefined | Minimum selectable date |
| maxDate | Date | false | undefined | Maximum selectable date |
| enableTime | boolean | false | false | Allow time selection |
| ignoreTimeValidation | boolean | false | true | Limit validation to date part |
| dateFormat | string | function | false | internal | Custom format function overrides internal formatter |
| placeholder | string | false | undefined | Placeholder for input |
| enforceUtc | boolean | false | false | Use UTC when formatting |
| defaultTime | { hours, minutes, seconds } | false | undefined | Default time when `enableTime` |

### `FormInputDatePickerAlt` props

| prop | type | required | default | description |
|------|------|----------|---------|-------------|
| locale | string | false | 'cs-CZ' | Locale |
| minDate | Date | false | undefined | Minimum date |
| maxDate | Date | false | undefined | Maximum date |
| enableTime | boolean | false | false | Time selection |
| ignoreTimeValidation | boolean | false | true | Date-only validation |
| dateFormat | string | function | false | internal | Custom formatter |
| placeholder | string | false | undefined | Placeholder |
| showNowButton | boolean | false | undefined | Show "Now" button |

Custom formatting:
```vue
<FormInputDatePicker v-model="picked" :dateFormat="d => d.toISOString().substring(0,10)" enforceUtc enableTime />
```

### `FormInputFile` props & patterns

| prop | type | required | default | description |
|------|------|----------|---------|-------------|
| multiple | boolean | false | false | Multiple file selection |
| accept | string | string[] | false | [] | Extensions (`.pdf`), MIME (`image/png`), wildcards (`image/*`, `*/json`, `text/*`) |
| renderAsGroup | boolean | false | false | Enable input group layout |
| name | string | false | undefined | Native name |

Filtering rules applied after selection:
* `.ext` matches filename ending
* `image/*` prefix wildcard
* `*suffix` / `prefix*` MIME segments
* Exact MIME type match

Example:
```vue
<FormInputFile v-model="files" :accept="['.pdf','image/*']" multiple label="Attachments" :renderAsGroup="true">
    <template #prepend><span class="input-group-text bi bi-paperclip" /></template>
</FormInputFile>
```

## Validation integration

Pass a Vuelidate validation entry via `validation`. Component will call `validation.$touch()` on model updates and only show invalid state when dirty. Required style auto-applies if any rule is present unless overridden by `showAsRequired`.

Custom messages: supply `validationMessages` object or embed messages in validators (with `$t:` prefix for translation).

## Formatting & modifiers

Use `formatter` functions plus `lazyFormatter` to adjust when they run. Combine with `modelModifiers` for numeric conversion, trimming or lazy updates.

```vue
<FormInput v-model="qty" type="number" label="Qty" :modelModifiers="{ number:true }" :formatter="v=>v.replace(/[^0-9]/g,'')" :lazyFormatter="false" />
```

## Accessibility

`aria-invalid` is derived from validation state; labels remain associated via generated or provided `id`. Group layouts use Bootstrap input-group semantics.

## Additional examples

Multi-select:
```vue
<FormInputSelect v-model="selected" :options="cities" multi :selectSize="6" placeholder="Choose cities" label="Cities" />
```

Inline radios:
```vue
<FormInputRadioGroup v-model="choice" :options="[{value:'a',text:'A'},{value:'b',text:'B'}]" :stacked="false" label="Choice" />
```

Switch-style checkbox group:
```vue
<FormInputCheckboxGroup v-model="features" :options="featureOptions" :renderAsSwitch="true" label="Features" />
```

Date-time with default time:
```vue
<FormInputDatePicker v-model="deadline" enableTime :defaultTime="{hours:9,minutes:0}" enforceUtc label="Deadline" placeholder="Select date & time" />
```

## Styling

Include Bootstrap and the package CSS. Override classes like `.form-group-required`, `.is-datepicker-invalid` or input-group segments as needed.

## Roadmap / contributions

Potential future docs: programmatic focus examples, migration guide from legacy bootstrap-vue-next versions, unit test patterns, Storybook showcase, dark mode notes. Contributions welcome.

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
