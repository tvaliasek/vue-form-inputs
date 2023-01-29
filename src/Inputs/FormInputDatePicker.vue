<template>
    <b-form-group
        :description="hint"
        :label-for="((id) ? `${id}_input` : undefined)"
        :class="{ 'form-group-required': isRequired }"
    >
        <template #label>
            {{ label }}
        </template>
        <date-picker
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
                <b-form-input
                    type="text"
                    :id="((id) ? `${id}_input` : undefined)"
                    :placeholder="placeholder"
                    :size="size"
                    :state="(invalid !== null) ? !invalid : null"
                    :disabled="disabled"
                    :model-value="displayValue"
                    :readonly="true"
                />
            </template>
        </date-picker>
        <b-form-invalid-feedback
            v-if="invalid"
        >
            <form-input-feedback-message
                :validation-model="validation"
                :messages="validationMessages"
            />
        </b-form-invalid-feedback>
        <slot name="input-text"></slot>
    </b-form-group>
</template>

<script>
import FormInput from './FormInput.vue'
import { dateFormat, dateTimeFormat } from './datePickerUtils.js'
import DatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

export default {
    name: 'FormInputDatePicker',
    extends: FormInput,
    components: {
        DatePicker
    },
    props: {
        locale: {
            type: String,
            required: false,
            default: 'cs-CZ'
        },
        minDate: {
            type: Date,
            required: false
        },
        maxDate: {
            type: Date,
            required: false
        },
        enableTime: {
            type: Boolean,
            required: false,
            default: false
        },
        ignoreTimeValidation: {
            type: Boolean,
            required: false,
            default: true
        },
        dateFormat: {
            type: Function,
            required: false
        }
        /*
        textToDate: {
            type: Function,
            required: false
        }
        */
    },
    data () {
        return {
            localDate: null
        }
    },
    computed: {
        dateFormatter () {
            return (this.dateFormat) ? this.dateFormat : ((this.enableTime) ? dateTimeFormat : dateFormat)
        },
        displayValue () {
            if (this.model) {
                return this.dateFormatter(this.model)
            }
            return null
        },
        model: {
            get () {
                if (!this.modelValue) {
                    return null
                }
                if (this.modelValue instanceof Date) {
                    return this.modelValue
                }
                const dateValue = new Date(this.modelValue)
                if (dateValue && !isNaN(dateValue.valueOf())) {
                    return dateValue
                }
                return null
            },
            set (value) {
                let dateValue = value
                if (!(value instanceof Date) && value) {
                    dateValue = new Date(value)
                }
                if (dateValue && !this.enableTime) {
                    dateValue = new Date(`${dateValue.toISOString().split('T')[0]}T00:00:00.000Z`)
                }
                this.$emit('update:modelValue', dateValue)
                if (this.validation.$touch !== undefined && typeof this.validation.$touch === 'function') {
                    this.validation.$touch()
                }
            }
        }
    }
    /*
    methods: {
        onUpdateModelValue (value) {
            this.localDate = `${value}`
            const date = (typeof this.textToDate === 'function') ? this.textToDate(this.localDate) : textToDate(this.localDate)
            if (date instanceof Date) {
                this.model = date
            }
        }
    }
    */
}
</script>
