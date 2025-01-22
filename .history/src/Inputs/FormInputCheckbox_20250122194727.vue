<template>
    <VfiFormGroup
        :description="hint"
        :class="{ 'form-group-required': isRequired }"
        :id="toValue(computedId)"
        :disabled="disabled"
        :state="invalid === null ? invalid : !invalid"
    >
        <VfiFormCheckbox
            v-if="$slots?.label === undefined && $slots?.default === undefined"
            v-model="model"
            :id="toValue(computedId)"
            :size="size"
            ref="input"
            :state="invalid === null ? invalid : !invalid"
            :switch="renderAsSwitch === true ? true : undefined"
            :disabled="disabled || readOnly"
            :label="label"
            @change="onChange"
            @update="onUpdate"
            @blur="onBlur"
        />

        <VfiFormCheckbox
            v-else
            v-model="model"
            :id="toValue(computedId)"
            :size="size"
            ref="input"
            :state="invalid === null ? invalid : !invalid"
            :switch="renderAsSwitch === true ? true : undefined"
            :disabled="disabled || readOnly"
            @change="onChange"
            @update="onUpdate"
            @blur="onBlur"
        >
            <template #default>
                <slot name="label"></slot>
                <slot></slot>
            </template>
        </VfiFormCheckbox>

        <template #invalid-feedback
            v-if="invalid && validation"
        >
            <FormInputFeedbackMessage
                :validation-model="validation"
                :messages="validationMessages"
            />
        </template>
    </VfiFormGroup>
</template>

<script setup lang="ts">
import { computed, unref, toValue, useId } from 'vue'
import { useInput } from './Composables/useInput'

import FormInputFeedbackMessage from './FormInputFeedbackMessage.vue'
import VfiFormGroup from './Bootstrap/VfiFormGroup.vue'
import VfiFormCheckbox from './Bootstrap/VfiFormCheckbox.vue'
import type { ValidationProp } from './ValidationProp.interface'

export interface ComponentProps {
    label?: string
    size?: 'sm' | 'lg'
    validationMessages?: Record<string, any>
    validation?: ValidationProp
    disabled?: boolean
    modelValue?: boolean
    hint?: string
    id?: string
    readOnly?: boolean
    showAsRequired?: boolean
    renderAsSwitch?: boolean
}

const props = withDefaults(
    defineProps<ComponentProps>(),
    {
        disabled: false,
        readOnly: false
    }
)

const $emit = defineEmits(['update:modelValue', 'change', 'update', 'blur'])

type modelType = boolean | undefined
const model = computed({
    get (): modelType {
        const modelValue = unref(props.modelValue)
        if (typeof modelValue === 'boolean') {
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

const computedId = computed(() => (props?.id) ? props.id : useId())

const {
    isRequired,
    invalid,
    onUpdate,
    onBlur,
    onChange
} = useInput(props, $emit)
</script>
