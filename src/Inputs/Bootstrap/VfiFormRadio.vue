<template>
    <div :class="[
            'form-check',
            (size !== undefined) ? `form-control-${size}` : undefined,
            {
                'form-check-inline': props.inline,
                'is-invalid': props.state === false,
                'is-valid': props.state === true
            }
        ]">
        <input
            :class="[
                'form-check-input',
                {
                    'is-invalid': props.state === false,
                    'is-valid': props.state === true
                }
            ]"
            type="radio"
            :value="value"
            :id="id"
            :disabled="disabled ?? undefined"
            :name="name"
            :checked="model === value ? true : undefined"
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
const props = withDefaults(defineProps<{
    id: string
    label?: string
    size?: 'sm' | 'lg'
    state?: boolean | null
    disabled?: boolean
    name?: string
    inline?: boolean
    value?: string | number | boolean | null
}>(), {
})

const model = defineModel<string | number | boolean | null>({ default: null })

function onInput (event: Event): void {
    if (props.value !== undefined) {
        model.value = props.value
    }
}
</script>
