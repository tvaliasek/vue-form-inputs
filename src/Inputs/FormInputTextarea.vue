<template>
    <b-form-group
        :label="label"
        :description="hint"
    >
        <b-form-textarea
            v-model.trim="model"
            :size="size"
            :state="(invalid !== null) ? !invalid : null"
            :disabled="disabled"
            :formatter="formatValue"
            :placeholder="placeholder"
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
import FormInput from './FormInput.vue'

export default {
    name: 'FormInputTextarea',
    extends: FormInput
}
</script>
