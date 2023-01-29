export default {
    label: {
        control: { type: 'text' }
    },
    type: {
        options: [
            'text',
            'password',
            'number'
        ],
        control: { type: 'select' }
    },
    size: {
        options: ['lg', 'md', 'sm'],
        control: { type: 'radio' }
    },
    validationMessages: {
        control: { type: 'object' }
    },
    validation: {
        control: { type: 'object' }
    },
    disabled: {
        control: { type: 'boolean' }
    },
    modelValue: {
        control: { type: 'text' }
    },
    hint: {
        control: { type: 'text' }
    },
    placeholder: {
        control: { type: 'text' }
    },
    formatter: {
        control: { disabled: true }
    },
    renderAsGroup: {
        control: { type: 'boolean' }
    },
    id: {
        control: { type: 'string' }
    },
    readOnly: {
        control: { type: 'boolean' }
    },
    showAsRequired: {
        control: { type: 'boolean' }
    }
}
