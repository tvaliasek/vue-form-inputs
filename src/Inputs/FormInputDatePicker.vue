<template>
    <b-form-group
        :label="label"
        :description="hint"
        :label-for="id"
    >
        <b-form-datepicker
            :id="id"
            :no-flip="true"
            :show-decade-nav="true"
            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
            :locale="'cs-CZ'"
            v-model.trim="model"
            :size="size"
            :state="(invalid !== null) ? !invalid : null"
            :disabled="disabled"
            lazy-formatter
            :min="minDate"
            :max="maxDate"
            :start-weekday="1"
            v-bind="labels"
            :readonly="readOnly"
            @change="onEvent('change')"
            @update="onEvent('update')"
            @blur="onEvent('blur')"
        />
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

export default {
    name: 'FormInputDatePicker',
    extends: FormInput,
    props: {
        minDate: {
            type: Date,
            required: false
        },
        maxDate: {
            type: Date,
            required: false
        },
        labels: {
            type: Object,
            required: false,
            default () {
                return {
                    labelCalendar: 'Kalendář',
                    labelCloseButton: 'Zavřít',
                    labelCurrentMonth: 'Tento mešíc',
                    labelHelp: 'Použijte šipky na klávesnici pro navigaci mezi daty.',
                    labelNav: 'Navigace v kalendáři',
                    labelNextDecade: 'Další dekáda',
                    labelNextMonth: 'Další měsíc',
                    labelNextYear: 'Další rok',
                    labelNoDateSelected: 'Nevybráno žádné datum',
                    labelPrevDecade: 'Předchozí dekáda',
                    labelPrevMonth: 'Předchozí měsíc',
                    labelPrevYear: 'Předchozí rok',
                    labelResetButton: 'Reset',
                    labelSelected: 'Vybraný den',
                    labelToday: 'Dnes',
                    labelTodayButton: 'Vybrat dnešek'
                }
            }
        }
    }
}
</script>
