<template>
    <VfiFormGroup
        :description="hint"
        :id="toValue(computedId)"
        :class="{ 'form-group-required': isRequired }"
        :label="label"
        :disabled="disabled"
        :state="invalid === null ? invalid : !invalid"
    >
        <template #label>
            <slot name="label"></slot>
        </template>
        <VfiFormTextarea
            :size="size"
            :id="toValue(computedId)"
            :state="(invalid !== null) ? !invalid : undefined"
            :disabled="disabled"
            :formatter="formatValue"
            :placeholder="placeholder"
            :lazy-formatter="(lazyFormatter === false ? undefined : true)"
            :model-modifiers="modelModifiers"
            :model-value="model"
            @update:model-value="onUpdateModelValue"
            @change="onChange"
            @update="onUpdate"
            @blur="onBlur"
            :readonly="readOnly"
            :rows="rows"
        />
        <template #invalid-feedback
            v-if="invalid && validation"
        >
            <FormInputFeedbackMessage
                :validation-model="validation"
                :messages="validationMessages"
            />
        </template>
        <slot name="input-text"></slot>
    </VfiFormGroup>
</template>

<script setup lang="ts">
import type { Validation } from '@vuelidate/core'
import { computed, toValue, unref, useId } from 'vue'
import { useInput } from './Composables/useInput'

import FormInputFeedbackMessage from './FormInputFeedbackMessage.vue'
import VfiFormGroup from './Bootstrap/VfiFormGroup.vue'
import VfiFormTextarea from './Bootstrap/VfiFormTextarea.vue'

export interface ComponentProps {
    label?: string
    rows?: number
    size?: 'sm' | 'lg'
    validationMessages?: Record<string, any>
    validation?: Validation
    disabled?: boolean
    modelValue?: string | null
    hint?: string
    placeholder?: string
    formatter?: (value: string, event: Event) => string
    id?: string
    readOnly?: boolean
    showAsRequired?: boolean
    lazyFormatter?: boolean
    modelModifiers?: Record<'number' | 'lazy' | 'trim', boolean | undefined>
}

const props = withDefaults(
    defineProps<ComponentProps>(),
    {
        disabled: false,
        readOnly: false,
        lazyFormatter: true
    }
)

const computedId = computed(() => (props.id) ? props.id : useId())

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
function onUpdateModelValue (value: modelType): void {
    model.value = value
}

const {
    isRequired,
    invalid,
    onChange,
    onUpdate,
    onBlur,
    formatValue
} = useInput(props, $emit)
</script>
