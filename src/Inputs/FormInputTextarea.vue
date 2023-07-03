<template>
    <BFormGroup
        :label="label"
        :description="hint"
        :label-for="id"
        :class="{ 'form-group-required': isRequired, 'bs-form-group': true }"
    >
        <template #label>
            {{ label }}
        </template>
        <BFormTextarea
            v-model.trim="model"
            :size="size"
            :id="id"
            :state="(invalid !== null) ? !invalid : undefined"
            :disabled="disabled"
            :formatter="formatValue"
            :placeholder="placeholder"
            :lazy-formatter="(lazyFormatter === false ? undefined : true)"
            @change="onChange"
            @update="onUpdate"
            @blur="onBlur"
            :readonly="readOnly"
            :rows="rows"
        />
        <BFormInvalidFeedback
            v-if="invalid && validation"
        >
            <FormInputFeedbackMessage
                :validation-model="validation"
                :messages="validationMessages"
            />
        </BFormInvalidFeedback>
        <slot name="input-text"></slot>
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
    rows?: number
    size?: Size
    validationMessages?: Record<string, any>
    validation?: Validation
    disabled?: boolean
    modelValue?: string | undefined
    hint?: string
    placeholder?: string
    formatter?: CallableFunction
    renderAsGroup?: boolean
    id?: string
    readOnly?: boolean
    showAsRequired?: boolean
    lazyFormatter?: boolean
}

const props = withDefaults(
    defineProps<ComponentProps>(),
    {
        disabled: false,
        renderAsGroup: false,
        readOnly: false,
        lazyFormatter: true
    }
)

const $emit = defineEmits(['update:modelValue', 'change', 'update', 'blur'])

type modelType = string | undefined
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
    onBlur,
    formatValue
} = useInput(props, $emit)
</script>
