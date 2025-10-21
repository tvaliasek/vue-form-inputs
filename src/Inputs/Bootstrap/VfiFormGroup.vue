<template>
    <div
        class="bs-form-group"
        :class="{
            disabled: disabled,
            'is-invalid': state === false,
            'is-valid': state === true
        }"
        :id="`${id}_formGroup`"
    >
        <slot name="label">
            <label
                v-if="label"
                :for="`${(labelFor) ? labelFor : id}`"
                :id="`${id}_formGroupLabel`"
                class="form-label"
            >
                <slot name="label-prepend"></slot><slot name="label-text">{{ label }}</slot><slot name="label-append"></slot>
            </label>
        </slot>
        <slot></slot>
        <slot name="description">
            <div
                v-if="description"
                class="form-text"
            >
                {{ description }}
            </div>
        </slot>
        <slot name="invalid-feedback">
            <div
                v-if="invalidFeedback && state === false"
                class="invalid-feedback"
            >
                {{ invalidFeedback }}
            </div>
        </slot>
        <slot name="valid-feedback">
            <div
                v-if="validFeedback && state === true"
                class="valid-feedback"
            >
                {{ validFeedback }}
            </div>
        </slot>
    </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
    id: string
    label?: string | null
    description?: string | null
    invalidFeedback?: string | null
    validFeedback?: string | null
    state?: boolean | null | undefined
    disabled?: boolean
    labelFor?: string
}>(), {
    state: null,
    disabled: false
})
</script>
