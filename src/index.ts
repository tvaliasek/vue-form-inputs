import {
    BForm,
    BFormCheckbox,
    BFormCheckboxGroup,
    BFormFloatingLabel,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BFormRadio,
    BFormRadioGroup,
    BFormRow,
    BFormSelect,
    BFormSelectOption,
    BFormSelectOptionGroup,
    BFormSpinButton,
    BFormTag,
    BFormTags,
    BFormText,
    BFormTextarea,
    BFormValidFeedback
} from 'bootstrap-vue-next'
import type { Plugin, App } from 'vue'

import input from './Inputs/FormInput.vue'
import checkboxInput from './Inputs/FormInputCheckbox.vue'
import checkboxGroupInput from './Inputs/FormInputCheckboxGroup.vue'
import radioGroupInput from './Inputs/FormInputRadioGroup.vue'
import selectInput from './Inputs/FormInputSelect.vue'
import textareaInput from './Inputs/FormInputTextarea.vue'
import datePickerInput from './Inputs/FormInputDatePicker.vue'

export const FormInput = input
export const FormInputCheckbox = checkboxInput
export const FormInputCheckboxGroup = checkboxGroupInput
export const FormInputRadioGroup = radioGroupInput
export const FormInputSelect = selectInput
export const FormInputTextarea = textareaInput
export const FormInputDatePicker = datePickerInput

export const FormInputsPlugin = (options: { includeBootstrapNextComponents: boolean } = { includeBootstrapNextComponents: true }): Plugin => {
    return {
        install (app: App) {
            if (options.includeBootstrapNextComponents) {
                app.component('BForm', BForm)
                app.component('BFormCheckbox', BFormCheckbox)
                app.component('BFormCheckboxGroup', BFormCheckboxGroup)
                app.component('BFormFloatingLabel', BFormFloatingLabel)
                app.component('BFormGroup', BFormGroup)
                app.component('BFormInput', BFormInput)
                app.component('BFormInvalidFeedback', BFormInvalidFeedback)
                app.component('BFormRadio', BFormRadio)
                app.component('BFormRadioGroup', BFormRadioGroup)
                app.component('BFormRow', BFormRow)
                app.component('BFormSelect', BFormSelect)
                app.component('BFormSelectOption', BFormSelectOption)
                app.component('BFormSelectOptionGroup', BFormSelectOptionGroup)
                app.component('BFormSpinButton', BFormSpinButton)
                app.component('BFormTag', BFormTag)
                app.component('BFormTags', BFormTags)
                app.component('BFormText', BFormText)
                app.component('BFormTextarea', BFormTextarea)
                app.component('BFormValidFeedback', BFormValidFeedback)
            }

            // own inputs
            app.component('FormInput', FormInput)
            app.component('FormInputTextarea', FormInputTextarea)
            app.component('FormInputCheckbox', FormInputCheckbox)
            app.component('FormInputCheckboxGroup', FormInputCheckboxGroup)
            app.component('FormInputRadioGroup', FormInputRadioGroup)
            app.component('FormInputSelect', FormInputSelect)
            app.component('FormInputDatePicker', FormInputDatePicker)
        }
    }
}
