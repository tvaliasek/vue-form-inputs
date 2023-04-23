<template>
    <BFormGroup
        :description="hint"
        :label-for="((id) ? `${id}_input` : undefined)"
        :class="{ 'form-group-required': isRequired }"
    >
        <template #label>
            {{ label }}
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
            :format="dateFormatter"
            :locale="locale"
            :uid="(id) ? `dtpkr_${id}` : undefined"
        >
            <template #dp-input>
                <BFormInput
                    type="text"
                    :id="((id) ? `${id}_input` : undefined)"
                    :placeholder="placeholder"
                    :size="size"
                    :state="(invalid !== null) ? !invalid : undefined"
                    :disabled="disabled"
                    :model-value="displayValue ?? ''"
                    :readonly="true"
                />
            </template>
        </DatePicker>
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
import { dateFormat, dateTimeFormat } from './datePickerUtils'
import DatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
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
    modelValue: string | Date | undefined
    hint?: string
    placeholder?: string
    id?: string
    readOnly?: boolean
    showAsRequired?: boolean
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

// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
const dateFormatter = computed(() => {
    const dateFormatFn = unref(props.dateFormat)
    return (typeof dateFormatFn === 'function') ? dateFormatFn : unref((unref(props.enableTime) ? dateTimeFormat : dateFormat))
})

const displayValue = computed(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const value = unref(model)
    if (value instanceof Date) {
        return unref(dateFormatter)(value)
    }
    return value
})

const {
    isRequired,
    invalid
} = useInput(props, $emit)
</script>

<style>
    .dp__main .dp__clear_icon {
        transform: translate(-50%,-50%);
    }
</style>
