<template>
    <div
        :class="[
            'form-check',
            (size !== undefined) ? `form-control-${size}` : undefined,
            {
                'form-switch': props.switch,
                'form-check-inline': props.inline,
                'is-invalid': props.state === false,
                'is-valid': props.state === true
            }
        ]"
    >
        <input
            :class="[
                'form-check-input',
                {
                    'is-invalid': props.state === false,
                    'is-valid': props.state === true
                }
            ]"
            type="checkbox"
            :role="props.switch ? 'switch' : 'checkbox'"
            :value="value ?? ''"
            :id="id"
            :disabled="disabled ?? undefined"
            :checked="model === true ? true : undefined"
            :name="name"
            :aria-invalid="props.state === false ? 'true' : 'false'"
            @input="onInput"
        />
        <label
            class="form-check-label"
            :for="id"
            v-if="$slots.default !== undefined"
        >
            <slot></slot>
        </label>
        <label
            class="form-check-label"
            :for="id"
            v-else
        >
            {{ label }}
        </label>
    </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'

const props = withDefaults(defineProps<{
    id: string
    label?: string
    size?: 'sm' | 'lg'
    state?: boolean | null
    switch?: boolean
    disabled?: boolean
    name?: string
    inline?: boolean
    value?: string | number | boolean | null
}>(), {
})

const model = defineModel<boolean | null>({ default: false })

const $emit = defineEmits(['add:checkboxValue', 'remove:checkboxValue'])

watch(model, (newValue) => {
    if (props.value !== undefined) {
        $emit((newValue === true) ? 'add:checkboxValue' : 'remove:checkboxValue', props.value)
    }
})

function onInput(event: Event): void {
    model.value = (event.target as HTMLInputElement).checked
}
</script>
