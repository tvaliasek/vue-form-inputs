import {
    FormPlugin,
    FormDatepickerPlugin,
    FormRadioPlugin,
    FormTextareaPlugin,
    FormSelectPlugin,
    FormGroupPlugin,
    FormInputPlugin,
    FormCheckboxPlugin,
    IconsPlugin,
    TooltipPlugin
} from 'bootstrap-vue'
import inputs from './Inputs/index.js'

export const FormInputsPlugin = {
    install (Vue) {
        Vue.use(FormPlugin)
        Vue.use(FormDatepickerPlugin)
        Vue.use(FormRadioPlugin)
        Vue.use(FormTextareaPlugin)
        Vue.use(FormSelectPlugin)
        Vue.use(FormGroupPlugin)
        Vue.use(FormInputPlugin)
        Vue.use(FormCheckboxPlugin)
        Vue.use(IconsPlugin)
        Vue.use(TooltipPlugin)
        for (const input of inputs) {
            Vue.component(input.name, input)
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