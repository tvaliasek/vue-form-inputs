<template>
    <textarea
        :id="computedId"
        ref="input"
        :value="model"
        :class="computedClasses"
        :name="name || undefined"
        :disabled="disabled"
        :placeholder="placeholder"
        :required="required || undefined"
        :autocomplete="autocomplete || undefined"
        :readonly="readonly || props.plaintext"
        :aria-required="required || undefined"
        :aria-invalid="computedAriaInvalid"
        @input="onInput($event)"
        @change="onChange($event)"
        @blur="onBlur($event)"
        :rows="rows"
    ></textarea>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import normalizeInput from './Utils/normalizeInput'
import useFormInput from '../Composables/useFormInput'
import useStateClass from '../Composables/useStateClass'

const props = withDefaults(defineProps<{
    id: string
    name?: string
    disabled?: boolean
    plaintext?: boolean
    placeholder?: string
    required?: boolean
    autocomplete?: string
    readonly?: boolean
    list?: string
    validation?: any
    validationMessages?: any
    state?: boolean | null
    size?: 'sm' | 'lg'
    debounce?: string | number
    debounceMaxWait?: string | number
    autofocus?: boolean
    formatter?: (value: string, evt: Readonly<Event>) => string
    lazyFormatter?: boolean
    ariaInvalid?: boolean | 'grammar' | 'spelling'
    modelValue?: string | number | null
    modelModifiers?: Partial<Record<'number' | 'lazy' | 'trim', boolean | undefined>>
    rows?: number | string
}>(), {
    disabled: false,
    plaintext: false,
    required: false,
    readonly: false,
    state: null,
    modelValue: ''
})

const $emit = defineEmits(['update:modelValue'])

const model = computed<string | number | null>({
    get() {
        return props.modelValue
    },
    set(value) {
        $emit('update:modelValue', normalizeInput(value, props.modelModifiers as any))
    }
})

const { input, computedId, computedAriaInvalid, onInput, onChange, onBlur, focus, blur } = useFormInput(props, model)

const stateClass = useStateClass(() => props.state)
const isHighlighted = ref(false)
const computedClasses = computed(() => {
    return [
        stateClass.value,
        {
            'form-control-highlighted': isHighlighted.value,
            'form-control': !props.plaintext,
            'form-control-plaintext': props.plaintext,
            ...(['sm', 'lg'].includes(String(props?.size)) ? { [`form-control-${String(props?.size)}`]: true } : {})
        }
    ]
})

defineExpose({
    element: input,
    focus,
    blur
})
</script>
