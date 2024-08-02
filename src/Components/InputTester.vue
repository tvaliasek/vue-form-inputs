<template>
    <h3>{{ props.title }}</h3>
    <div class="row mb-4">
        <div class="col-12 col-sm-6">
            <slot></slot>
        </div>
        <div class="col-12 col-sm-6">
            <p>Model value: {{ JSON.stringify(props.inputValue) }}</p>
            <pre>{{ inputValue }} {{ `${inputValue}`.length }}</pre>
            <pre>{{ JSON.stringify(props.validation, null, 4) }}</pre>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Validation } from '@vuelidate/core'

export interface ComponentProps {
    title: string
    inputValue: unknown
    validation?: Validation
}

const props = defineProps<ComponentProps>()
</script>
