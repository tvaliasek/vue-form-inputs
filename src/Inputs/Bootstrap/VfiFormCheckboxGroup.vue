<template>
    <div
        :class="[
            'form-checkbox-group',
            {
                'is-invalid': state === false,
                'is-valid': state === true
            }
        ]"
        :id="toValue(computedId)"
    >
        <VfiFormCheckbox
            v-for="(option, index) in options"
            :key="`${toValue(computedId)}-${option.value}-${index}`"
            :id="`${toValue(computedId)}-checkbox-${option.value}`"
            :label="option.text"
            :size="size"
            :state="state"
            :switch="props.switch"
            :disabled="disabled"
            :name="`${name}-${index}`"
            :inline="inline"
            :value="option.value"
            :model-value="model.includes(option.value)"
            @add:checkboxValue="onAddCheckboxValue"
            @remove:checkboxValue="onRemoveCheckboxValue"
        />
    </div>
</template>

<script setup lang="ts">
import { computed, toValue } from 'vue'
import VfiFormCheckbox from './VfiFormCheckbox.vue'
import useId from '../Composables/useId'

const props = withDefaults(defineProps<{
    id: string
    label?: string
    size?: 'sm' | 'lg'
    state?: boolean | null
    switch?: boolean
    disabled?: boolean
    name?: string
    inline?: boolean
    modelValue: Array<number | string | null | boolean | undefined>
    options?: Array<{ value: string | number | boolean | null | undefined, text: string, disabled?: boolean }>
}>(), {
    disabled: false,
    inline: false,
    options: () => []
})

const $emit = defineEmits(['update:modelValue'])

const computedId = computed(() => useId(props.id))

const model = computed<Array<number | string | null | boolean | undefined>>({
    get () {
        return [...props.options.map(item => item.value)].filter(value => props.modelValue.includes(value))
    },
    set (value) {
        $emit('update:modelValue', value)
    }
})

function onAddCheckboxValue (value: number | string | null | boolean | undefined): void {
    if (model.value.includes(value)) {
        return
    }
    model.value = [...model.value, value]
}

function onRemoveCheckboxValue (value: number | string | null | boolean | undefined): void {
    model.value = model.value.filter(item => item !== value)
}
</script>
