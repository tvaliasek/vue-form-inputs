<template>
    <b-form-group
        :description="hint"
        :label-for="id"
        :class="{ 'form-group-required': isRequired }"
    >
        <template #label>
            {{ label }}
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
        </template>
        <div
            v-if="renderAsGroup"
            :class="{ 'input-group': true, 'is-invalid': ((invalid !== null) ? !invalid : null), 'is-valid': ((invalid !== null) ? !!invalid : null) }"
        >
            <b-form-input
                v-model.trim="model"
                :id="id"
                :size="size"
                :type="type"
                :state="(invalid !== null) ? !invalid : null"
                :disabled="disabled"
                :formatter="formatValue"
                :placeholder="placeholder"
                :readonly="readOnly"
                lazy-formatter
                @change="onEvent('change')"
                @update="onEvent('update')"
                @blur="onEvent('blur')"
            />
            <div class="input-group-append">
                <slot></slot>
            </div>
        </div>
        <b-form-input
            v-else
            v-model.trim="model"
            :id="id"
            :size="size"
            :type="type"
            :state="(invalid !== null) ? !invalid : null"
            :disabled="disabled"
            :formatter="formatValue"
            :placeholder="placeholder"
            :readonly="readOnly"
            lazy-formatter
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
import FormInputFeedbackMessage from './FormInputFeedbackMessage.vue'

export default {
    name: 'FormInput',
    components: {
        FormInputFeedbackMessage
    },
    props: {
        label: {
            type: String,
            required: false
        },
        type: {
            type: String,
            required: false,
            default: 'text'
        },
        size: {
            type: String,
            required: false,
            default: 'md'
        },
        validationMessages: {
            type: Object,
            required: false,
            default () {
                return {}
            }
        },
        validation: {
            type: Object,
            required: false,
            default () {
                return {}
            }
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        value: {
            required: false
        },
        hint: {
            type: String,
            required: false
        },
        placeholder: {
            type: String,
            required: false
        },
        formatter: {
            type: Function,
            required: false
        },
        renderAsGroup: {
            type: Boolean,
            required: false,
            default: false
        },
        id: {
            type: String,
            required: false
        },
        readOnly: {
            type: Boolean,
            required: false,
            default: false
        },
        showAsRequired: {
            required: false,
            default: null
        },
        hasTooltip: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    computed: {
        isRequired () {
            if (this.showAsRequired === false) {
                return false
            }
            if (this.showAsRequired === true) {
                return true
            }
            if (!this.validation || Object.keys(this.validation).length === 0) {
                return false
            }
            return Object.keys(this.validation).filter(propName => !`${propName}`.startsWith('$')).length > 0
        },
        model: {
            get () {
                return this.value
            },
            set (value) {
                this.$emit('input', value)
                if (this.validation.$touch !== undefined && typeof this.validation.$touch === 'function') {
                    this.validation.$touch()
                }
            }
        },
        invalid () {
            if (this.validation.$invalid !== undefined) {
                return (this.validation.$dirty) ? this.validation.$invalid : null
            }
            return null
        }
    },
    methods: {
        onEvent (eventName) {
            const _this = this
            return (eventData) => {
                _this.$emit(eventName, eventData)
            }
        },
        formatValue (value) {
            if (typeof this.formatter === 'function') {
                return this.formatter(value)
            }
            return value
        }
    }
}
</script>
