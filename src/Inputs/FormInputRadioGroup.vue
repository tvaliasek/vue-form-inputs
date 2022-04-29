<template>
    <b-form-group
        :description="hint"
        :class="{ 'form-group-required': isRequired }"
        :label-for="id"
    >
        <template #label>
            {{ label }}
            <span v-if="hasTooltip">
                <b-icon
                    ref="information-icon"
                    icon="info-circle"
                />
                <b-tooltip
                    :target="() => $refs['information-icon']"
                    triggers="hover"
                >
                    <slot name="tooltip-content"></slot>
                </b-tooltip>
            </span>
        </template>
        <b-form-radio-group
            v-model="model"
            :id="id"
            :size="size"
            :state="(invalid !== null) ? !invalid : null"
            :disabled="disabled || readOnly"
            :options="arrayOptions"
            :stacked="stacked"
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
    </b-form-group>
</template>

<script>
import FormInput from './FormInput.vue'

export default {
    name: 'FormInputRadioGroup',
    extends: FormInput,
    props: {
        options: {
            required: true,
            validator (value) {
                return (typeof value === 'object' || Array.isArray(value))
            }
        },
        stacked: {
            type: Boolean,
            required: false,
            default: true
        }
    },
    computed: {
        arrayOptions () {
            if (this.options === null) {
                return []
            }
            if (Array.isArray(this.options)) {
                return this.options
            }
            if (typeof this.options === 'object') {
                const options = []
                for (const index in this.options) {
                    options.push({
                        value: index,
                        text: `${this.options[index]}`
                    })
                }
                return options
            }
            return []
        }
    }
}
</script>