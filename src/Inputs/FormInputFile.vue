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
            :class="{ 'input-group': true, 'is-invalid': ((invalid !== null) ? !invalid : undefined), 'is-valid': ((invalid !== null) ? !!invalid : undefined) }"
        >
            <input
                ref="fileInput"
                :id="id"
                :class="inputClassNames"
                :disabled="disabled"
                :placeholder="placeholder"
                :readonly="readOnly"
                :multiple="multiple === true ? true : undefined"
                type="file"
                :accept="acceptTypes"
                @change="onInputEvent"
                @blur="onInputEvent"
            />
            <div class="input-group-append">
                <slot></slot>
            </div>
        </div>
        <input
            v-else
            ref="fileInput"
            :id="id"
            :class="inputClassNames"
            :disabled="disabled"
            :placeholder="placeholder"
            :readonly="readOnly"
            :multiple="multiple === true ? true : undefined"
            type="file"
            :accept="acceptTypes"
            @change="onInputEvent"
            @blur="onInputEvent"
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
import type { Size } from 'bootstrap-vue-next'
import { computed, unref, watch, ref } from 'vue'
import { useInput } from './Composables/useInput'

import FormInputFeedbackMessage from './FormInputFeedbackMessage.vue'

export interface ComponentProps {
    label?: string
    size?: Size
    validationMessages?: Record<string, any>
    validation?: Validation
    disabled?: boolean
    modelValue?: File | File[] | null
    hint?: string
    placeholder?: string
    renderAsGroup?: boolean
    id?: string
    readOnly?: boolean
    showAsRequired?: boolean
    multiple?: boolean
    accept: string | string[]
}

const props = withDefaults(
    defineProps<ComponentProps>(),
    {
        disabled: false,
        renderAsGroup: false,
        readOnly: false,
        multiple: false
    }
)

const $emit = defineEmits(['update:modelValue', 'change', 'blur'])

const fileInput = ref<HTMLInputElement | null>(null)
const model = computed({
    get (): File | File[] | undefined | null {
        return unref(props.modelValue)
    },
    set (value: File | File[] | undefined | null): void {
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
    onEvent
} = useInput(props, $emit)

const acceptTypes = computed(() => {
    const accept = unref(props.accept)
    if (typeof accept === 'string') {
        return accept.toLowerCase().trim()
    }
    if (Array.isArray(accept) && accept.length > 0) {
        const temp = [...new Set(accept.map(item => `${item ?? ''}`.toLowerCase().trim()))].filter(item => item)
        if (temp.length > 0) {
            return temp.join(',')
        }
    }
    return undefined
})

watch(computed(() => props.modelValue), (value: File | File[] | undefined | null) => {
    if (value === undefined || value === null || (Array.isArray(value) && value.length === 0)) {
        if (fileInput.value !== null) {
            fileInput.value.value = ''
        }
    }
})

function onInputEvent (event: Event): void {
    if (['change', 'blur'].includes(event.type)) {
        const accept = unref(acceptTypes)
        const files = (event.target as HTMLInputElement).files
        if (files !== null && files?.length > 0) {
            const patterns = (accept !== undefined) ? accept.split(',') : []
            const acceptedFiles: File[] = [...files].filter((file: File) => {
                if (patterns.length === 0) {
                    return true
                }
                for (const pattern of patterns) {
                    if (
                        (pattern.startsWith('.') && file.name.toLowerCase().endsWith(pattern)) ||
                        (pattern.startsWith('*') && file.type.endsWith(pattern.replace('*', ''))) ||
                        (pattern.endsWith('*') && file.type.startsWith(pattern.replace('*', ''))) ||
                        (file.type === pattern)
                    ) {
                        return true
                    }
                }
                return false
            })
            model.value = (acceptedFiles.length > 0) ? unref(props.multiple) ? [...acceptedFiles] : acceptedFiles[0] : undefined
        } else {
            model.value = undefined
        }
        onEvent(event.type === 'change' ? 'change' : 'blur')(unref(model))
    }
}

const inputClassNames = computed(() => {
    const size = unref(props.size)
    const isInvalid = unref(invalid)
    const classNames: Record<string, any> = {
        'form-control': true,
        [`form-control-${size ?? ''}`]: ['sm', 'lg'].includes(size ?? ''),
        'is-invalid': isInvalid !== null ? isInvalid === true : null,
        'is-valid': isInvalid !== null ? isInvalid === false : null
    }
    return classNames
})
</script>
