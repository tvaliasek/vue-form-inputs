<template>
    <b-form-group
        :description="hint"
        :class="{ 'form-group-required': isRequired }"
    >
        <b-form-checkbox
            v-if="renderAsSwitch"
            v-model="model"
            :id="id"
            :size="size"
            :state="(invalid !== null) ? !invalid : null"
            switch
            :disabled="disabled || readOnly"
            @change="onEvent('change')"
            @update="onEvent('update')"
            @blur="onEvent('blur')"
        >
            <slot>
                {{label}}
            </slot>
        </b-form-checkbox>
        <b-form-checkbox
            v-else
            v-model="model"
            :id="id"
            :size="size"
            :state="(invalid !== null) ? !invalid : null"
            :disabled="disabled || readOnly"
            @change="onEvent('change')"
            @update="onEvent('update')"
            @blur="onEvent('blur')"
        >
            <slot>
                {{label}}
            </slot>
        </b-form-checkbox>
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
    name: 'FormInputCheckbox',
    extends: FormInput,
    props: {
        renderAsSwitch: {
            type: Boolean,
            required: false,
            default: false
        }
    }
}
</script>
