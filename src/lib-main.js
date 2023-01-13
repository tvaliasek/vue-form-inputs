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
} from 'bootstrap-vue-3'

import inputs from './Inputs/index.js'

export const FormInputsPlugin = {
    install (app) {
        app.component(BForm)
        app.component(BFormCheckbox)
        app.component(BFormCheckboxGroup)
        app.component(BFormFloatingLabel)
        app.component(BFormGroup)
        app.component(BFormInput)
        app.component(BFormInvalidFeedback)
        app.component(BFormRadio)
        app.component(BFormRadioGroup)
        app.component(BFormRow)
        app.component(BFormSelect)
        app.component(BFormSelectOption)
        app.component(BFormSelectOptionGroup)
        app.component(BFormSpinButton)
        app.component(BFormTag)
        app.component(BFormTags)
        app.component(BFormText)
        app.component(BFormTextarea)
        app.component(BFormValidFeedback)

        for (const input of inputs) {
            app.component(input.name, input)
        }
    }
}

export { default as FormInput } from './Inputs/FormInput.vue'
export { default as FormInputDatePicker } from './Inputs/FormInputDatePicker.vue'
export { default as FormInputFeedbackMessage } from './Inputs/FormInputFeedbackMessage.vue'
export { default as FormInputRadioGroup } from './Inputs/FormInputRadioGroup.vue'
export { default as FormInputSelect } from './Inputs/FormInputSelect.vue'
export { default as FormInputTextarea } from './Inputs/FormInputTextarea.vue'
export { default as FormInputCheckboxGroup } from './Inputs/FormInputCheckboxGroup.vue'
export { default as FormInputCheckbox } from './Inputs/FormInputCheckbox.vue'
