import type { Plugin, App } from 'vue'

import input from './Inputs/FormInput.vue'
import checkboxInput from './Inputs/FormInputCheckbox.vue'
import checkboxGroupInput from './Inputs/FormInputCheckboxGroup.vue'
import radioGroupInput from './Inputs/FormInputRadioGroup.vue'
import selectInput from './Inputs/FormInputSelect.vue'
import textareaInput from './Inputs/FormInputTextarea.vue'
import datePickerInput from './Inputs/FormInputDatePicker.vue'
import fileInput from './Inputs/FormInputFile.vue'
import datePickerAltInput from './Inputs/FormInputDatePickerAlt.vue'

export const FormInput = input
export const FormInputCheckbox = checkboxInput
export const FormInputCheckboxGroup = checkboxGroupInput
export const FormInputRadioGroup = radioGroupInput
export const FormInputSelect = selectInput
export const FormInputTextarea = textareaInput
export const FormInputDatePicker = datePickerInput
export const FormInputFile = fileInput
export const FormInputDatePickerAlt = datePickerAltInput
export const TRANSLATE_INJECTION_KEY = '$vfiTranslate'

export const FormInputsPlugin = (): Plugin => {
    return {
        install(app: App) {
            app.component('FormInput', FormInput)
            app.component('FormInputTextarea', FormInputTextarea)
            app.component('FormInputCheckbox', FormInputCheckbox)
            app.component('FormInputCheckboxGroup', FormInputCheckboxGroup)
            app.component('FormInputRadioGroup', FormInputRadioGroup)
            app.component('FormInputSelect', FormInputSelect)
            app.component('FormInputDatePicker', FormInputDatePicker)
            app.component('FormInputFile', FormInputFile)
            app.component('FormInputDatePickerAlt', FormInputDatePickerAlt)
        }
    }
}
