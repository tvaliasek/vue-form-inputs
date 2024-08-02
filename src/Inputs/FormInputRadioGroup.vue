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
        <VfiFormRadioGroup
            v-model="model"
            :id="toValue(computedId)"
            :size="size"
            :state="(invalid !== null) ? !invalid : undefined"
            :disabled="disabled || readOnly"
            :options="options"
            :stacked="stacked"
            @change="onChange"
            @update="onUpdate"
            @blur="onBlur"
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
import { computed, unref, toValue } from 'vue'
import { useInput } from './Composables/useInput'
import VfiFormGroup from './Bootstrap/VfiFormGroup.vue'
import VfiFormRadioGroup from './Bootstrap/VfiFormRadioGroup.vue'
import useId from './Composables/useId'

import FormInputFeedbackMessage from './FormInputFeedbackMessage.vue'

export interface ComponentProps {
    label?: string
    size?: 'sm' | 'lg'
    validationMessages?: Record<string, any>
    validation?: Validation
    disabled?: boolean
    modelValue?: string | number | null | boolean | undefined
    hint?: string
    id?: string
    readOnly?: boolean
    showAsRequired?: boolean
    options?: Array<{ value: any, text: string }>
    stacked?: boolean
}

const props = withDefaults(
    defineProps<ComponentProps>(),
    {
        disabled: false,
        readOnly: false,
        stacked: true,
        options: () => []
    }
)

const computedId = computed(() => useId(props.id))

const $emit = defineEmits(['update:modelValue', 'change', 'update', 'blur'])

type modelType = string | number | null | boolean | undefined

const model = computed({
    get (): modelType {
        return props.modelValue
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
