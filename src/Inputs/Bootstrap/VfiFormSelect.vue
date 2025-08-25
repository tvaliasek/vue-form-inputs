<template>
    <select
        :id="toValue(computedId)"
        ref="input"
        v-model="model"
        :class="computedClasses"
        :name="name || undefined"
        :disabled="disabled || undefined"
        :required="required || undefined"
        :readonly="readonly"
        :aria-required="required || undefined"
        :aria-invalid="computedAriaInvalid"
        :multiple="props.multiple || undefined"
        @change="onChange($event)"
        @blur="onBlur($event)"
    >
        <slot name="first"></slot>
        <option
            v-for="option in options"
            :value="option.value"
            :key="`${option.value}-${option.text}`"
            :disabled="option.disabled || undefined"
        >
            {{ option.text }}
        </option>
        <slot name="last"></slot>
    </select>
</template>

<script setup lang="ts">
import { computed, ref, toValue, useId } from 'vue'
import useStateClass from '../Composables/useStateClass'
import useAriaInvalid from '../Composables/useAriaInvalid'
import { useFocus } from '@vueuse/core'

const props = withDefaults(defineProps<{
    id: string
    name?: string
    disabled?: boolean
    placeholder?: string
    required?: boolean
    autocomplete?: string
    readonly?: boolean
    list?: string
    validation?: any
    validationMessages?: any
    state?: boolean | null
    size?: 'sm' | 'lg'
    autofocus?: boolean
    ariaInvalid?: boolean | 'grammar' | 'spelling'
    modelValue?: string | number | undefined | null | boolean | Array<string | number | null | undefined | boolean>
    multiple?: boolean
    selectSize?: number
    options?: Array<{ value: string | number | boolean | null, text: string, disabled?: boolean }>
}>(), {
    disabled: false,
    required: false,
    readonly: false,
    state: null,
    options: () => []
})

const input = ref<HTMLSelectElement | null>(null)
const $emit = defineEmits(['update:modelValue', 'change', 'blur'])

function onChange(data: any): void {
    $emit('change', data)
}

function onBlur(data: any): void {
    $emit('blur', data)
}

const model = computed<string | number | undefined | null | boolean | Array<string | number | null | undefined | boolean>>({
    get() {
        const value = props.modelValue
        if (props.multiple) {
            return Array.isArray(value) ? value : ((value !== undefined) ? [value] : [])
        }
        return value ?? ''
    },
    set(value) {
        if (props.multiple) {
            $emit('update:modelValue', Array.isArray(value) ? value : ((value !== undefined) ? [value] : []))
            return
        }
        $emit('update:modelValue', value)
    }
})

const stateClass = useStateClass(() => props.state)
const isHighlighted = ref(false)
const computedClasses = computed(() => {
    return [
        stateClass.value,
        {
            'form-control-highlighted': isHighlighted.value,
            'form-select': true,
            ...(['sm', 'lg'].includes(String(props?.size)) ? { [`form-control-${String(props?.size)}`]: true } : {}),
            ...(['sm', 'lg'].includes(String(props?.size)) ? { [`form-select-${String(props?.size)}`]: true } : {})
        }
    ]
})

const computedId = computed(() => (props?.id) ? props.id : useId())

const computedAriaInvalid = useAriaInvalid(
    () => props.ariaInvalid,
    () => props.state
)

const focus = (): void => {
    if (!props.disabled) {
        focused.value = true
    }
}

const blur = (): void => {
    if (!props.disabled) {
        focused.value = false
    }
}

const { focused } = useFocus(input, {
    initialValue: props.autofocus
})

defineExpose({
    element: input,
    focus,
    blur
})
</script>
