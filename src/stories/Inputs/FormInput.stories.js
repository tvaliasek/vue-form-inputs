import FormInput from '../../Inputs/FormInput.vue'
import textInputArgTypes from './textInputArgTypes'

export default {
    title: 'FormInput',
    component: FormInput,
    argTypes: {
        ...textInputArgTypes
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
