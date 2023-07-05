<template>
    <BFormGroup
        :description="hint"
        :label-for="id"
        :class="{ 'form-group-required': isRequired, 'bs-form-group': true }"
    >
        <template #label>
            {{ label }}
        </template>
        <div
            v-if="renderAsGroup"
            :class="{ 'input-group': true, 'is-invalid': ((invalid !== null) ? !!invalid : undefined), 'is-valid': ((invalid !== null) ? !invalid : undefined) }"
        >
            <slot name="prepend"></slot>
            <BFormInput
                v-model.trim="model"
                :id="id"
                :size="size"
                :type="type"
                :state="(invalid !== null) ? !invalid : undefined"
                :disabled="disabled"
                :formatter="formatValue"
                :placeholder="placeholder"
                :readonly="readOnly"
                :lazy-formatter="(lazyFormatter === false ? undefined : true)"
                @change="onChange"
                @update="onUpdate"
                @blur="onBlur"
            />
            <slot></slot>
            <slot name="append"></slot>
        </div>
        <BFormInput
            v-else
            v-model.trim="model"
            :id="id"
            :size="size"
            :type="type"
            :state="(invalid !== null) ? !invalid : undefined"
            :disabled="disabled"
            :formatter="formatValue"
            :placeholder="placeholder"
            :readonly="readOnly"
            :lazy-formatter="(lazyFormatter === false ? undefined : true)"
            @change="onChange"
            @update="onUpdate"
            @blur="onBlur"
        />
        <BFormInvalidFeedback
            v-if="invalid && validation"
        >
            <FormInputFeedbackMessage
                :validation-model="validation"
                :messages="validationMessages"
            />
        </BFormInvalidFeedback>
        <slot name="input-text"></slot>
    </BFormGroup>
</template>

<script setup lang="ts">
import type { Validation } from '@vuelidate/core'
import type { InputType, Size } from 'bootstrap-vue-next'
import { computed, unref } from 'vue'
import { useInput } from './Composables/useInput'

import FormInputFeedbackMessage from './FormInputFeedbackMessage.vue'

export interface ComponentProps {
    label?: string
    type?: InputType
    size?: Size
    validationMessages?: Record<string, any>
    validation?: Validation
    disabled?: boolean
    modelValue: unknown
    hint?: string
    placeholder?: string
    formatter?: CallableFunction
    renderAsGroup?: boolean
    id?: string
    readOnly?: boolean
    showAsRequired?: boolean
    lazyFormatter?: boolean
}

const props = withDefaults(
    defineProps<ComponentProps>(),
    {
        type: 'text',
        disabled: false,
        renderAsGroup: false,
        readOnly: false,
        lazyFormatter: true
    }
)

const $emit = defineEmits(['update:modelValue', 'change', 'update', 'blur'])

type modelType = string | number | undefined
const model = computed({
    get (): modelType {
        const modelValue = unref(props.modelValue)
        if (typeof modelValue === 'string' || typeof modelValue === 'number') {
            return modelValue
        }
        return undefined
    },
    set (value: modelType): void {
        $emit('update:modelValue', value)
        const validation = unref(props.validation)
        if (typeof validation?.$touch === 'function') {
            validation.$touch()
        }
    }
})

const {
    isRequired,
    invalid,
    onUpdate,
    onChange,
    onBlur,
    formatValue
} = useInput(props, $emit)
</script>

<style lang="scss">
[aria-invalid="true"] + .invalid-feedback {
    display: block;
}
</style>
