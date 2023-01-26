import FormInput from '../../Inputs/FormInput.vue'
// import { BFormGroup, BFormInvalidFeedback, BFormInput } from 'bootstrap-vue-next'

export default {
    title: 'FormInput',
    component: FormInput,
    argTypes: {
        size: {
            options: ['lg', 'md', 'sm'],
            control: { type: 'radio' }
        }
    }
}

const Template = (args) => ({
    components: {
        FormInput
    },
    setup () {
        return { args }
    },
    template: `
        <FormInput
            v-bind="args"
        />
    `
})

export const CommonTextInput = Template.bind({})

CommonTextInput.args = {
    label: 'Testing common text input'
}
