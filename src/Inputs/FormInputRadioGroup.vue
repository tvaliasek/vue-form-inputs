<template>
    <BFormGroup
        :description="hint"
        :class="{ 'form-group-required': isRequired }"
        :label-for="id"
    >
        <template #label>
            {{ label }}
        </template>
        <BFormRadioGroup
            v-model="model"
            :id="id"
            :size="size"
            :state="(invalid !== null) ? !invalid : null"
            :disabled="disabled || readOnly"
            :options="options"
            :stacked="stacked"
            @change="onChange"
            @update="onUpdate"
            @blur="onBlur"
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
import type { InputType, Size } from 'bootstrap-vue-next'
import { computed, unref } from 'vue'
import { useInput } from './Composables/useInput'

import FormInputFeedbackMessage from './FormInputFeedbackMessage.vue'

export interface ComponentProps {
    label?: string
    type?: InputType
    size?: Size
    validationMessages?: Record<string, any>
    validation?: Validation
    disabled?: boolean
    modelValue: string | number | undefined
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

const $emit = defineEmits(['update:modelValue', 'change', 'update', 'blur'])

type modelType = string | number | undefined
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
