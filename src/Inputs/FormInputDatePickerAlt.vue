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
        <DatePicker
            v-model="model"
            text-input
            :auto-apply="true"
            :close-on-auto-apply="!enableTime"
            :disabled="disabled"
            :enable-time-picker="enableTime"
            :min-date="minDate || undefined"
            :max-date="maxDate || undefined"
            :prevent-min-max-navigation="!!(minDate || maxDate)"
            :ignore-time-validation="ignoreTimeValidation"
            :format="dateFormat"
            :placeholder="placeholder"
            hideInputIcon
            :showNowButton="showNowButton"
            :readonly="readOnly"
            :inputClassName="`form-control form-control-${size}`"
            :locale="locale"
            :uid="id ?? undefined"
            :class="{ 'is-datepicker-invalid': ((invalid !== null) ? invalid : false) }"
        >
        </DatePicker>
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
import DatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import type { Validation } from '@vuelidate/core'
import { computed, unref, toValue } from 'vue'
import { useInput } from './Composables/useInput'

import FormInputFeedbackMessage from './FormInputFeedbackMessage.vue'
import VfiFormGroup from './Bootstrap/VfiFormGroup.vue'
import useId from './Composables/useId'

export interface ComponentProps {
    modelValue: string | Date | undefined
    label?: string
    size?: 'sm' | 'lg'
    validationMessages?: Record<string, any>
    validation?: Validation
    disabled?: boolean
    hint?: string
    placeholder?: string
    id?: string
    readOnly?: boolean
    showAsRequired?: boolean
    showNowButton?: boolean
    locale?: string
    minDate?: Date
    maxDate?: Date
    enableTime?: boolean
    ignoreTimeValidation?: boolean
    dateFormat?: string | ((params: Date | Date[]) => string)
}

const props = withDefaults(
    defineProps<ComponentProps>(),
    {
        disabled: false,
        renderAsGroup: false,
        readOnly: false,
        ignoreTimeValidation: true,
        enableTime: false,
        locale: 'cs-CZ'
    }
)

const computedId = computed(() => useId(props.id))

const $emit = defineEmits(['update:modelValue', 'change', 'update', 'blur'])

const model = computed({
    get (): string | Date | undefined {
        const modelValue = unref(props.modelValue)
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!modelValue) {
            return undefined
        }
        if (modelValue instanceof Date) {
            return modelValue
        }
        const dateValue = new Date(modelValue)
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (dateValue && !isNaN(dateValue.valueOf())) {
            return dateValue
        }
        return undefined
    },
    set (value: string | Date | undefined): void {
        let dateValue = unref(value)
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!(dateValue instanceof Date) && (typeof dateValue === 'string' || typeof dateValue === 'number')) {
            dateValue = new Date(dateValue)
        }
        if (dateValue instanceof Date && !unref(props.enableTime)) {
            dateValue = new Date(`${dateValue.toISOString().split('T')[0]}T00:00:00.000Z`)
        }
        $emit('update:modelValue', dateValue)
        const validation = unref(props.validation)
        if (typeof validation?.$touch === 'function') {
            validation.$touch()
        }
    }
})

const {
    isRequired,
    invalid
} = useInput(props, $emit)
</script>
