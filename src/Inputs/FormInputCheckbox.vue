<template>
    <BFormGroup
        :description="hint"
        :class="{ 'form-group-required': isRequired }"
    >
        <BFormCheckbox
            v-model="model"
            :id="id"
            :size="size"
            :state="(invalid !== null) ? !invalid : null"
            :switch="renderAsSwitch === true ? true : undefined"
            :disabled="disabled || readOnly"
            @change="onEvent('change')"
            @update="onEvent('update')"
            @blur="onEvent('blur')"
        >
            <slot>
                {{label}}
            </slot>
        </BFormCheckbox>
        <BFormInvalidFeedback
            v-if="invalid"
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
import { useInput } from './Composables/useInput.ts'

import FormInputFeedbackMessage from './FormInputFeedbackMessage.vue'

export interface ComponentProps {
    label?: string
    size?: Size
    validationMessages?: Record<string, any>
    validation?: Validation
    disabled?: boolean
    modelValue?: boolean
    hint?: string
    id?: string
    readOnly?: boolean
    showAsRequired?: boolean
    renderAsSwitch?: boolean
}

const props = withDefaults(
    defineProps<ComponentProps>(),
    {
        disabled: false,
        readOnly: false
    }
)

const $emit = defineEmits(['update:modelValue', 'change', 'update', 'blur'])

type modelType = boolean | undefined
const model = computed({
    get (): modelType {
        const modelValue = unref(props.modelValue)
        if (typeof modelValue === 'boolean') {
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
    onEvent
} = useInput(props)
</script>
