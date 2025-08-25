<template>
    <div
        :class="[
            'form-radio-group',
            {
                'is-invalid': state === false,
                'is-valid': state === true
            }
        ]"
        :id="toValue(computedId)"
    >
        <VfiFormRadio
            v-for="(option, index) in options"
            :key="`${toValue(computedId)}-${option.value}-${index}`"
            :id="`${toValue(computedId)}-radio-${option.value}`"
            :label="option.text"
            :size="size"
            :state="state"
            :disabled="disabled || option.disabled"
            :name="name ?? toValue(computedId)"
            :inline="inline"
            :value="option.value"
            v-model="model"
        />
    </div>
</template>

<script setup lang="ts">
import { computed, toValue, useId } from 'vue'
import VfiFormRadio from './VfiFormRadio.vue'

const props = withDefaults(defineProps<{
    id: string
    label?: string
    size?: 'sm' | 'lg'
    state?: boolean | null
    disabled?: boolean
    name?: string
    inline?: boolean
    modelValue: number | string | null | boolean | undefined
    options?: Array<{ value: string | number | boolean | null | undefined, text: string, disabled?: boolean }>
}>(), {
    disabled: false,
    inline: false,
    options: () => []
})

const $emit = defineEmits(['update:modelValue'])

const computedId = computed(() => (props?.id) ? props.id : useId())

const model = computed<number | string | null | boolean | undefined>({
    get() {
        return props.modelValue
    },
    set(value) {
        $emit('update:modelValue', value)
    }
})
</script>
