import FormInputDatePicker from '../../Inputs/FormInputDatePicker.vue'
import textInputArgTypes from './textInputArgTypes'

export default {
    title: 'FormInputDatePicker',
    component: FormInputDatePicker,
    argTypes: {
        ...textInputArgTypes,
        modelValue: {
            control: { disabled: true }
        },
        readOnly: {
            control: { disabled: true }
        },
        type: {
            control: { disabled: true }
        },
        locale: {
            control: { type: 'string' }
        },
        minDate: {
            control: { type: 'date' }
        },
        maxDate: {
            control: { type: 'date' }
        },
        enableTime: {
            control: { type: 'boolean' }
        },
        ignoreTimeValidation: {
            control: { type: 'boolean' }
        },
        dateFormat: {
            control: { disabled: true }
        }
    }
}

const Template = (args) => ({
    components: {
        FormInputDatePicker
    },
    setup () {
        return { args }
    },
    template: `
        <FormInputDatePicker
            v-bind="args"
        />
    `
})

export const DatePickerFormInput = Template.bind({})

DatePickerFormInput.args = {
    label: 'Testing date picker input'
}
