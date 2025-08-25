<template>
    <VfiFormGroup
        :description="hint"
        :class="{ 'form-group-required': isRequired }"
        :id="toValue(computedId)"
        :disabled="disabled"
        :state="invalid === null ? invalid : !invalid"
        :label="label"
    >
        <template #label>
            <slot name="label"></slot>
        </template>
        <VfiFormCheckboxGroup
            v-model="model"
            :id="toValue(computedId)"
            :size="size"
            :state="(invalid !== null) ? !invalid : undefined"
            :disabled="disabled || readOnly"
            :options="options"
            :inline="!stacked"
            :switch="renderAsSwitch"
            @change="onChange"
            @update="onUpdate"
            @blur="onBlur"
        />
        <template
            #invalid-feedback
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
import VfiFormGroup from './Bootstrap/VfiFormGroup.vue'
import VfiFormCheckboxGroup from './Bootstrap/VfiFormCheckboxGroup.vue'
import FormInputFeedbackMessage from './FormInputFeedbackMessage.vue'
import type { ValidationProp } from './ValidationProp.interface'

export interface ComponentProps {
    label?: string
    size?: 'sm' | 'lg'
    validationMessages?: Record<string, any>
    validation?: ValidationProp
    disabled?: boolean
    modelValue?: Array<string | boolean | number | null>
    hint?: string
    id?: string
    readOnly?: boolean
    showAsRequired?: boolean
    options?: Array<{ value: string | boolean | number | null, text: string }>
    stacked?: boolean
    renderAsSwitch?: boolean
}

const props = withDefaults(
    defineProps<ComponentProps>(),
    {
        disabled: false,
        readOnly: false,
        stacked: true,
        options: () => [],
        renderAsSwitch: false
    }
)

const $emit = defineEmits(['update:modelValue', 'change', 'update', 'blur'])

const computedId = computed(() => (props?.id) ? props.id : useId())

type modelType = Array<string | boolean | number | null>
const model = computed({
    get(): modelType {
        return props.modelValue ?? []
    },
    set(value: modelType): void {
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
    onBlur,
    onChange,
    onUpdate
} = useInput(props, $emit)
</script>
