<template>
    <b-form-group
        :description="hint"
        :label-for="((id) ? `${id}_input` : undefined)"
        :class="{ 'form-group-required': isRequired }"
    >
        <template #label>
            {{ label }}
        </template>
        <b-input-group v-if="buttonOnly" :class="((invalid !== null) ? ((invalid ? 'is-invalid' : 'is-valid'))  : undefined)">
            <b-form-input
                :id="((id) ? `${id}_input` : undefined)"
                v-model.trim="localDate"
                type="text"
                :placeholder="datePlaceholder"
                :size="size"
                :state="(invalid !== null) ? !invalid : null"
                :disabled="disabled"
                :readonly="readOnly"
                @blur="onTextInputBlur"
                :formatter="parseFormatDate"
                lazy-formatter
            />
            <b-input-group-append>
                <!--
                <b-form-datepicker
                    :id="id"
                    :no-flip="true"
                    :show-decade-nav="true"
                    :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                    :locale="locale"
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
                    @context="onContext"
                    :aria-controls="`${id}_input`"
                    button-only
                />
                -->
            </b-input-group-append>
        </b-input-group>
        <b-form-input
            v-else
            v-model="localDate"
            :id="id"
            :size="size"
            :type="type"
            :state="(invalid !== null) ? !invalid : null"
            :disabled="disabled"
            :placeholder="placeholder"
            :readonly="readOnly"
            @change="onEvent('change')"
            @update="onEvent('update')"
            @blur="onEvent('blur')"
            ref="dateInput"
        />
        <!--
        <b-form-datepicker
            v-else
            :id="id"
            :no-flip="true"
            :show-decade-nav="true"
            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
            :locale="locale"
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
        -->
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
import { TempusDominus, Namespace, extend } from '@eonasdan/tempus-dominus'
import '@eonasdan/tempus-dominus/dist/css/tempus-dominus.min.css'
import tempusDominusVueModelPlugin from './tempusDominusVueModelPlugin'

const localization = {
    today: 'Dnes',
    clear: 'Vymazat',
    close: 'Zavřít',
    selectMonth: 'Vybrat měsíc',
    previousMonth: 'Předchozí měsíc',
    nextMonth: 'Následující měsíc',
    selectYear: 'Vybrat rok',
    previousYear: 'Předchozí rok',
    nextYear: 'Následující rok',
    selectDecade: 'Vybrat desetiletí',
    previousDecade: 'Předchozí desetiletí',
    nextDecade: 'Další desetiletí',
    previousCentury: 'Předchozí století',
    nextCentury: 'Další století',
    pickHour: 'Vybrat hodinu',
    incrementHour: 'Přidat hodinu',
    decrementHour: 'Ubrat hodinu',
    pickMinute: 'Vybrat minutu',
    incrementMinute: 'Přidat minutu',
    decrementMinute: 'Ubrat minutu',
    pickSecond: 'Vybrat vteřinu',
    incrementSecond: 'Přidat vteřinu',
    decrementSecond: 'Ubrat vteřinu',
    toggleMeridiem: 'Přepnout denní dobu',
    selectTime: 'Vybrat čas',
    selectDate: 'Vybrat datum',
    dayViewHeaderFormat: { month: 'long', year: '2-digit' },
    locale: 'cs',
    startOfTheWeek: 1,
    ordinal: (n) => `${n}.`
}

export default {
    name: 'FormInputDatePicker',
    extends: FormInput,
    props: {
        locale: {
            type: String,
            required: false,
            default: 'cs-CZ'
        },
        buttonOnly: {
            type: Boolean,
            required: false,
            default: false
        },
        datePlaceholder: {
            type: String,
            required: false
        },
        minDate: {
            type: Date,
            required: false
        },
        maxDate: {
            type: Date,
            required: false
        }
    },
    data () {
        return {
            formatted: '',
            selected: '',
            tempusDominusInstance: null,
            localDate: ''
        }
    },
    mounted () {
        this.$nextTick(() => {
            extend(
                tempusDominusVueModelPlugin,
                {
                    setVueModelValue: (value) => {
                        this.model = (value ? new Date(value) : null) || null
                    },
                    getVueModelValue: () => {
                        if (this.model) {
                            const value = new Date(`${this.model}`)
                            if (value instanceof Date && !isNaN(value.valueOf())) {
                                return value
                            }
                        }
                        return undefined
                    }
                }
            )
            const instance = new TempusDominus(
                this.$refs.dateInput.$el,
                {
                    localization
                }
            )
            instance.subscribe(Namespace.events.change, (event) => {
                this.model = new Date(event.date).toISOString()
            })
            this.tempusDominusInstance = instance
        })
    },
    beforeUnmount () {
        if (this.tempusDominusInstance !== null) {
            this.tempusDominusInstance.dispose()
            this.tempusDominusInstance = null
        }
    },
    methods: {
        onTextInputBlur () {
            const value = `${this.model}`
            this.model = ''
            this.$nextTick(() => {
                this.model = value
            })
        }
    }
}
</script>
