<template>
    <b-form-group
        :label="label"
        :description="hint"
        :label-for="id"
    >
        <div
            v-if="renderAsGroup"
            :class="{ 'input-group': true, 'is-invalid': ((invalid !== null) ? !invalid : null), 'is-valid': ((invalid !== null) ? !!invalid : null) }"
        >
            <b-form-select
                v-model="model"
                :size="size"
                :id="id"
                :state="(invalid !== null) ? !invalid : null"
                :disabled="disabled || readOnly"
                :placeholder="placeholder"
                :options="arrayOptions"
                @change="onEvent('change')"
                @update="onEvent('update')"
                @blur="onEvent('blur')"
                :multiple="multi"
                :select-size="selectSize"
            />
            <div class="input-group-append">
                <slot></slot>
            </div>
        </div>
        <b-form-select
            v-else
            v-model="model"
            :size="size"
            :id="id"
            :state="(invalid !== null) ? !invalid : null"
            :disabled="disabled || readOnly"
            :placeholder="placeholder"
            :options="arrayOptions"
            @change="onEvent('change')"
            @update="onEvent('update')"
            @blur="onEvent('blur')"
            :multiple="multi"
            :select-size="selectSize"
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
    name: 'FormInputSelect',
    extends: FormInput,
    props: {
        options: {
            required: true,
            validator (value) {
                return (typeof value === 'object' || Array.isArray(value))
            }
        },
        multi: {
            type: Boolean,
            required: false,
            default: false
        },
        selectSize: {
            required: false
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
