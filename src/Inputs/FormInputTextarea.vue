<template>
    <b-form-group
        :label="label"
        :description="hint"
        :label-for="id"
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
        <b-form-textarea
            v-model.trim="model"
            :size="size"
            :id="id"
            :state="(invalid !== null) ? !invalid : null"
            :disabled="disabled"
            :formatter="formatValue"
            :placeholder="placeholder"
            lazy-formatter
            @change="onEvent('change')"
            @update="onEvent('update')"
            @blur="onEvent('blur')"
            :readonly="readOnly"
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
