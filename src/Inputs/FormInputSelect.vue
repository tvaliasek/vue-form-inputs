<template>
    <VfiFormGroup
        :description="hint"
        :id="toValue(computedId)"
        :class="{ 'form-group-required': isRequired }"
        :label="label"
        :disabled="disabled"
        :state="invalid === null ? invalid : !invalid"
    >
        <template #label>
            <slot name="label"></slot>
        </template>
        <div
            v-if="renderAsGroup"
            :class="[
                'input-group',
                {
                    'is-invalid': ((invalid !== null) ? !!invalid : undefined),
                    'is-valid': ((invalid !== null) ? !invalid : undefined)
                }
            ]"
        >
            <slot name="prepend"></slot>
            <VfiFormSelect
                :id="toValue(computedId)"
                :size="size"
                :state="(invalid !== null) ? !invalid : undefined"
                :disabled="disabled || readOnly"
                :options="computedOptions"
                :placeholder="placeholder"
                :readonly="readOnly"
                :name="name"
                :model-value="model"
                @update:model-value="onUpdateModelValue"
                @change="onChange"
                @update="onUpdate"
                @blur="onBlur"
                :multiple="multi"
                :select-size="(multi === true) ? selectSize : undefined"
            />
            <slot></slot>
            <slot name="append"></slot>
        </div>
        <VfiFormSelect
            v-else
            :id="toValue(computedId)"
            :size="size"
            :state="(invalid !== null) ? !invalid : undefined"
            :disabled="disabled || readOnly"
            :options="computedOptions"
            :placeholder="placeholder"
            :readonly="readOnly"
            :name="name"
            :model-value="model"
            @update:model-value="onUpdateModelValue"
            @change="onChange"
            @update="onUpdate"
            @blur="onBlur"
            :multiple="multi"
            :select-size="(multi === true) ? selectSize : undefined"
        />
        <template #invalid-feedback
            v-if="invalid && validation"
        >
            <FormInputFeedbackMessage
                :validation-model="validation"
                :messages="validationMessages"
            />
        </template>
        <slot name="input-text"></slot>
    </VfiFormGroup>
</template>

<script setup lang="ts">
import type { Validation } from '@vuelidate/core'
import { computed, unref, toValue } from 'vue'
import { useInput } from './Composables/useInput'
import VfiFormGroup from './Bootstrap/VfiFormGroup.vue'
import VfiFormSelect from './Bootstrap/VfiFormSelect.vue'
import useId from './Composables/useId'
import FormInputFeedbackMessage from './FormInputFeedbackMessage.vue'

export interface ComponentProps {
    label?: string
    size?: 'sm' | 'lg'
    validationMessages?: Record<string, any>
    validation?: Validation
    disabled?: boolean
    modelValue?: string | number | null | boolean | undefined | Array<string | number | null | boolean | undefined>
    hint?: string
    placeholder?: string
    renderAsGroup?: boolean
    id?: string
    readOnly?: boolean
    showAsRequired?: boolean
    options?: Array<{ value: string | number | boolean | null, text: string, disabled?: boolean }>
    multi?: boolean
    selectSize?: number
    name?: string
}

const props = withDefaults(
    defineProps<ComponentProps>(),
    {
        disabled: false,
        renderAsGroup: false,
        readOnly: false,
        options: () => []
    }
)

const computedId = computed(() => useId(props.id))

/**
 * Computed property which adds  `placeholder` prop as first "empty" option.
 * But only if there is no option with empty string directly passed from user in `options` prop.
 */
const computedOptions = computed(() => {
    const options = unref(props.options)
    const placeholder = unref(props.placeholder)

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (placeholder && !options.some((option) => (option.value === ''))) {
        return [
            { value: '', text: placeholder, disabled: true },
            ...options
        ]
    } else {
        return options
    }
})

const $emit = defineEmits(['update:modelValue', 'change', 'update', 'blur'])

type modelType = string | number | undefined | null | boolean | Array<string | number | null | undefined | boolean>
const model = computed({
    get (): modelType {
        return props.modelValue
    },
    set (value: modelType): void {
        $emit('update:modelValue', value)
        const validation = unref(props.validation)
        if (typeof validation?.$touch === 'function') {
            validation.$touch()
        }
    }
})

function onUpdateModelValue (value: modelType): void {
    model.value = value
}

const {
    isRequired,
    invalid,
    onChange,
    onUpdate,
    onBlur
} = useInput(props, $emit)
</script>
