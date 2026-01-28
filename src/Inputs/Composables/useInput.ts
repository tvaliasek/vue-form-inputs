import { computed, unref } from 'vue'

export function useInput(props: Record<string, any>, $emit: (event: any, ...args: any) => void) {
    const isRequired = computed(() => {
        const showAsRequired = unref(props.showAsRequired)
        if (showAsRequired === false || showAsRequired === true) {
            return !!showAsRequired
        }
        if (props.validation !== undefined) {
            const validationValue = JSON.parse(JSON.stringify(props.validation))

            if (validationValue && typeof validationValue === 'object') {
                return Object.keys(validationValue).filter(propName => !`${propName}`.startsWith('$')).length > 0
            }
        }
        return false
    })

    const invalid = computed(() => {
        const validation = unref(props.validation)
        if (validation?.$invalid !== undefined) {
            return (validation.$dirty) ? validation.$invalid : null
        }
        return null
    })

    const onEvent = (eventName: 'change' | 'update' | 'blur' | 'focus') => {
        return (eventData: unknown) => {
            $emit(eventName, eventData)
        }
    }

    const onChange = onEvent('change')
    const onUpdate = onEvent('update')
    const onBlur = onEvent('blur')
    const onFocus = onEvent('focus')

    const formatValue = function (value: string, event?: Event): string {
        const formatter = unref(props.formatter)
        if (typeof formatter === 'function') {
            return formatter(value, event)
        }
        return value
    }

    return {
        isRequired,
        invalid,
        onChange,
        onUpdate,
        onBlur,
        onEvent,
        onFocus,
        formatValue
    }
}
