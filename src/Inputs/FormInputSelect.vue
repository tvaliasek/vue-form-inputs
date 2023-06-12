<template>
    <BFormGroup
        :description="hint"
        :class="{ 'form-group-required': isRequired, 'bs-form-group': true }"
        :label-for="id"
    >
        <template #label>
            {{ label }}
        </template>
        <div
            v-if="renderAsGroup"
            :class="{ 'input-group': true, 'is-invalid': ((invalid !== null) ? !!invalid : undefined), 'is-valid': ((invalid !== null) ? !invalid : undefined) }"
        >
            <slot name="prepend"></slot>
            <BFormSelect
                v-model="model"
                :size="size"
                :id="id"
                :state="(invalid !== null) ? !invalid : undefined"
                :disabled="disabled || readOnly"
                :options="computedOptions"
                @change="onChange"
                @update="onUpdate"
                @blur="onBlur"
                :multiple="multi"
                :select-size="(multi === true) ? selectSize : undefined"
            />
            <slot></slot>
            <slot name="append"></slot>
        </div>
        <BFormSelect
            v-else
            v-model="model"
            :size="size"
            :id="id"
            :state="(invalid !== null) ? !invalid : undefined"
            :disabled="disabled || readOnly"
            :options="computedOptions"
            @change="onChange"
            @update="onUpdate"
            @blur="onBlur"
            :multiple="multi"
            :select-size="(multi === true) ? selectSize : undefined"
        />
        <BFormInvalidFeedback
            v-if="invalid && validation"
        >
            <FormInputFeedbackMessage
                :validation-model="validation"
                :messages="validationMessages"
            />
        </BFormInvalidFeedback>
    </BFormGroup>
</template>

<script setup lang="ts">
import type { Validation } from '@vuelidate/core'
import type { Size } from 'bootstrap-vue-next'
import { computed, unref } from 'vue'
import { useInput } from './Composables/useInput'

import FormInputFeedbackMessage from './FormInputFeedbackMessage.vue'

export interface ComponentProps {
    label?: string
    size?: Size
    validationMessages?: Record<string, any>
    validation?: Validation
    disabled?: boolean
    modelValue?: string | number | undefined
    hint?: string
    placeholder?: string
    renderAsGroup?: boolean
    id?: string
    readOnly?: boolean
    showAsRequired?: boolean
    options?: Array<{ value: any, text: string }>
    multi?: boolean
    selectSize?: number
}

const props = withDefaults(
    defineProps<ComponentProps>(),
    {
        disabled: false,
        renderAsGroup: false,
        readOnly: false,
        options: () => []
    }
)

/**
 * Computed property which adds  `placeholder` prop as first "empty" option.
 * But only if there is no option with empty string directly passed from user in `options` prop.
 */
const computedOptions = computed(() => {
    const options = unref(props.options)
    const placeholder = unref(props.placeholder)

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (placeholder && !options.some((option) => (option.value === ''))) {
        return [
            { value: '', text: placeholder, disabled: true },
            ...options
        ]
    } else {
        return options
    }
})

const $emit = defineEmits(['update:modelValue', 'change', 'update', 'blur'])

type modelType = string | number | undefined
const model = computed({
    get (): modelType {
        const modelValue = unref(props.modelValue)
        if (typeof modelValue === 'string' || typeof modelValue === 'number') {
            return modelValue
        }
        return undefined
    },
    set (value: modelType): void {
        $emit('update:modelValue', value)
        const validation = unref(props.validation)
        if (typeof validation?.$touch === 'function') {
            validation.$touch()
        }
    }
})

const {
    isRequired,
    invalid,
    onChange,
    onUpdate,
    onBlur
} = useInput(props, $emit)
</script>
