<template>
    <div class="container py-5">
        <h1>Usage example</h1>
        <hr/>

        <InputTester
            :title="'Basic text input'"
            :input-value="textInput"
        >
            <FormInput
                label="Text input"
                v-model.trim="textInput"
                :validation="v$.textInput"
            />
        </InputTester>

        <InputTester
            :title="'Basic textarea input'"
            :input-value="textareaInput"
        >
            <form-input-textarea
                label="Textarea input"
                v-model.trim="textareaInput"
                :validation="v$.textareaInput"
            />
        </InputTester>

        <InputTester
            :title="'Select input'"
            :input-value="selectInput"
        >
            <form-input-select
                label="Select input"
                v-model="selectInput"
                :validation="v$.selectInput"
                :options="options"
            />
        </InputTester>

        <InputTester
            :title="'Checkbox input'"
            :input-value="checkboxInput"
        >
            <form-input-checkbox
                v-model="checkboxInput"
            >
                Checkbox
            </form-input-checkbox>
        </InputTester>

        <InputTester
            :title="'Checkbox group'"
            :input-value="checkboxGroup"
        >
            <form-input-checkbox-group
                label="Checkbox group"
                v-model="checkboxGroup"
                :validation="v$.checkboxGroup"
                :options="options"
            />
        </InputTester>

        <InputTester
            :title="'Radio group'"
            :input-value="radioGroup"
        >
            <form-input-radio-group
                label="Radio group"
                v-model="radioGroup"
                :validation="v$.radioGroup"
                :options="options"
            />
        </InputTester>

        <InputTester
            :title="'Date picker input'"
            :input-value="dateInput"
        >
            <form-input-date-picker
                label="Datepicker input"
                v-model.trim="dateInput"
                :validation="v$.dateInput"
            />
        </InputTester>
    </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import { ref, computed } from 'vue'
import InputTester from './components/InputTester.vue'

const textInput = ref(null)
const textareaInput = ref(null)
const selectInput = ref(null)
const checkboxInput = ref(null)
const checkboxGroup = ref([])
const radioGroup = ref(null)
const dateInput = ref(null)

const options = computed(() => [
    {
        value: 1,
        text: 'First'
    },
    {
        value: 2,
        text: 'Second'
    },
    {
        value: 3,
        text: 'Third'
    }
])

const v$ = useVuelidate({
    textInput: { required, minLength: minLength(8) },
    textareaInput: { required },
    selectInput: { required },
    checkboxInput: { required },
    checkboxGroup: { required },
    radioGroup: { required },
    dateInput: { required }
}, {
    textInput,
    textareaInput,
    selectInput,
    checkboxInput,
    checkboxGroup,
    radioGroup,
    dateInput
})
</script>
