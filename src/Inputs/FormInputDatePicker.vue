<template>
    <b-form-group
        :description="hint"
        :label-for="((id) ? `${id}_input` : undefined)"
        :class="{ 'form-group-required': isRequired }"
    >
        <template #label>
            {{ label }}
            <!--
            <span v-if="hasTooltip">
                <span
                    ref="information-icon"
                >
                    <slot
                        name="tooltip-icon"
                    />
                </span>
                <b-tooltip
                    :target="() => $refs['information-icon']"
                    :triggers="['hover', 'click']"
                >
                    <slot name="tooltip-content"></slot>
                </b-tooltip>
            </span>
            -->
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
            </b-input-group-append>
        </b-input-group>

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

function parseFormatDate (value) {
    if (value instanceof Date) {
        return `${value.getDate()}. ${value.getMonth() + 1}. ${value.getFullYear()}`
    }
    if (typeof value === 'string') {
        if (/(\d{4}-\d{2}-\d{2})/ig.test(value.replace(/\s/ig, ''))) {
            const parts = value.split('-').map(item => parseInt(item))
            const date = new Date()
            date.setFullYear(parts[0])
            date.setMonth(parts[1] - 1)
            date.setDate(parts[2])
            return `${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()}`
        }
        if (/(\d{1,2}\.\d{1,2}\.\d{4})/ig.test(value.replace(/\s/ig, ''))) {
            const parts = value.split('.').map(item => parseInt(item))
            const date = new Date()
            date.setFullYear(parts[2])
            date.setMonth(parts[1] - 1)
            date.setDate(parts[0])
            return `${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()}`
        }
    }
    return ''
}

export default {
    name: 'FormInputDatePicker',
    extends: FormInput,
    data () {
        return {
            formatted: '',
            selected: ''
        }
    },
    computed: {
        localDate: {
            get () {
                return (this.model) ? parseFormatDate(this.model) : ''
            },
            set (value) {
                const localValue = `${value}`.replace(/\s/ig, '')
                if (/(\d{1,2}\.\d{1,2}\.\d{4})/ig.test(localValue)) {
                    const parts = value.split('.').map(item => parseInt(item))
                    let date = new Date()
                    date.setFullYear(parts[2])
                    date.setMonth(parts[1] - 1)
                    date.setDate(parts[0])
                    date.setHours(12, 0, 0, 0)
                    if (this.maxDate instanceof Date && date > this.maxDate) {
                        date = new Date(this.maxDate.valueOf())
                    }
                    if (this.minDate instanceof Date && date < this.minDate) {
                        date = new Date(this.minDate.valueOf())
                    }
                    this.model = date.toISOString().split('T')[0]
                }
            }
        }
    },
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
    },
    methods: {
        parseFormatDate (value) {
            return parseFormatDate(value)
        },
        onContext (ctx) {
            this.selected = ctx.selectedYMD
        },
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
