import type { App, Plugin } from 'vue'

import FormInput from './Inputs/FormInput.vue'
import FormInputCheckbox from './Inputs/FormInputCheckbox.vue'
import FormInputCheckboxGroup from './Inputs/FormInputCheckboxGroup.vue'
import FormInputRadioGroup from './Inputs/FormInputRadioGroup.vue'
import FormInputSelect from './Inputs/FormInputSelect.vue'
import FormInputTextarea from './Inputs/FormInputTextarea.vue'
import FormInputDatePicker from './Inputs/FormInputDatePicker.vue'
import FormInputFile from './Inputs/FormInputFile.vue'
import FormInputDatePickerAlt from './Inputs/FormInputDatePickerAlt.vue'
import FormGroup from './Inputs/Bootstrap/VfiFormGroup.vue'

export {
    FormInput,
    FormInputCheckbox,
    FormInputCheckboxGroup,
    FormInputRadioGroup,
    FormInputSelect,
    FormInputTextarea,
    FormInputDatePicker,
    FormInputFile,
    FormInputDatePickerAlt,
    FormGroup
}
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
            app.component('FormGroup', FormGroup)
        }
    }
}
