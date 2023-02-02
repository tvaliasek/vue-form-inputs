<template>
    <div class="container py-5">
        <h1>Usage example</h1>
        <hr/>

        <input-tester
            :title="'Basic text input'"
            :input-value="textInput"
        >
            <form-input
                label="Text input"
                v-model.trim="textInput"
                :validation="v$.textInput"
            />
        </input-tester>

        <input-tester
            :title="'Basic textarea input'"
            :input-value="textareaInput"
        >
            <form-input-textarea
                label="Textarea input"
                v-model.trim="textareaInput"
                :validation="v$.textareaInput"
            />
        </input-tester>

        <input-tester
            :title="'Select input'"
            :input-value="selectInput"
        >
            <form-input-select
                label="Select input"
                v-model="selectInput"
                :validation="v$.selectInput"
                :options="options"
            />
        </input-tester>

        <input-tester
            :title="'Checkbox input'"
            :input-value="checkboxInput"
        >
            <form-input-checkbox
                v-model="checkboxInput"
            >
                Checkbox
            </form-input-checkbox>
        </input-tester>

        <input-tester
            :title="'Checkbox group'"
            :input-value="checkboxGroup"
        >
            <form-input-checkbox-group
                label="Checkbox group"
                v-model="checkboxGroup"
                :validation="v$.checkboxGroup"
                :options="options"
            />
        </input-tester>

        <input-tester
            :title="'Radio group'"
            :input-value="radioGroup"
        >
            <form-input-radio-group
                label="Radio group"
                v-model="radioGroup"
                :validation="v$.radioGroup"
                :options="options"
            />
        </input-tester>

        <input-tester
            :title="'Date picker input'"
            :input-value="dateInput"
        >
            <form-input-date-picker
                label="Datepicker input"
                v-model.trim="dateInput"
                :validation="v$.dateInput"
            />
        </input-tester>
    </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import InputTester from './components/InputTester.vue'

export default {
    name: 'App',
    components: {
        InputTester
    },
    setup () {
        return {
            v$: useVuelidate()
        }
    },
    data () {
        return {
            textInput: null,
            textareaInput: null,
            selectInput: null,
            checkboxInput: null,
            checkboxGroup: [],
            radioGroup: null,
            dateInput: null
        }
    },
    computed: {
        options () {
            return [
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
            ]
        }
    },
    methods: {

    },
    validations () {
        return {
            textInput: { required, minLength: minLength(8) },
            textareaInput: { required },
            selectInput: { required },
            checkboxInput: { required },
            checkboxGroup: { required },
            radioGroup: { required },
            dateInput: { required }
        }
    }
}
</script>
