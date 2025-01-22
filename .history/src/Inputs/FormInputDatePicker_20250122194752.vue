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
            :locale="locale"
            :uid="`dtpkr_${toValue(computedId)}`"
            :utc="enforceUtc ? 'preserve' : false"
            :class="{ 'is-datepicker-invalid': ((invalid !== null) ? invalid : false) }"
            :start-time="defaultTime"
        >
            <template #dp-input>
                <VfiFormInput
                    type="text"
                    :id="`${toValue(computedId)}_input`"
                    :placeholder="placeholder"
                    :size="size"
                    :state="(invalid !== null) ? !invalid : undefined"
                    :disabled="disabled"
                    :model-value="displayValue ?? ''"
                    :readonly="true"
                />
            </template>
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
import { dateFormat as dateFormatFunction, dateTimeFormat } from './datePickerUtils'
import { computed, unref, toValue, useId } from 'vue'
import { useInput } from './Composables/useInput'
import DatePicker from '@vuepic/vue-datepicker'
import FormInputFeedbackMessage from './FormInputFeedbackMessage.vue'
import VfiFormGroup from './Bootstrap/VfiFormGroup.vue'
import VfiFormInput from './Bootstrap/VfiFormInput.vue'
import type { ValidationProp } from './ValidationProp.interface'

export interface ComponentProps {
    label?: string
    size?: 'sm' | 'lg'
    validationMessages?: Record<string, any>
    validation?: ValidationProp
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
    enforceUtc?: boolean
    defaultTime?: {
        hours?: number | string
        minutes?: number | string
        seconds?: number | string
    }
}

const props = withDefaults(
    defineProps<ComponentProps>(),
    {
        disabled: false,
        renderAsGroup: false,
        readOnly: false,
        ignoreTimeValidation: true,
        enableTime: false,
        locale: 'cs-CZ',
        enforceUtc: false
    }
)

const computedId = computed(() => (props?.id) ? props.id : useId())

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
    return (typeof dateFormatFn === 'function') ? dateFormatFn : unref((unref(props.enableTime) ? dateTimeFormat : dateFormatFunction))
})

const displayValue = computed(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const value = unref(model)
    if (value instanceof Date) {
        return unref(dateFormatter)(value, unref(props.locale), unref(props.enforceUtc))
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
    .is-datepicker-invalid + .invalid-feedback {
        display: block;
    }
</style>
