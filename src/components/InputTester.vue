<template>
    <h3>{{ title }}</h3>
    <div class="row mb-4">
        <div class="col-12 col-sm-6">
            <slot></slot>
        </div>
        <div class="col-12 col-sm-6">
            <p>Model value: {{ JSON.stringify(inputValue) }}</p>
            <pre>{{ JSON.stringify(validation, null, 4) }}</pre>
        </div>
    </div>
</template>

<script>
export default {
    name: 'InputTester',
    props: {
        title: {
            type: String,
            required: true
        },
        inputValue: {
            required: true
        },
        validation: {
            required: false
        }
    }
}
</script>
