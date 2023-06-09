<template>
    <div class="container py-5">
        <h1>Usage example</h1>
        <p>
            Vuelidate detected: {{ vuelidateDetected }}, Vue I18n detected: {{ vueI18nDetected }}
        </p>
        <hr/>
        <div class="row">
            <div class="col-12 col-md-8">
                <InputTester
                    :title="'Basic text input'"
                    :input-value="textInput"
                >
                    <FormInput
                        label="Text input"
                        v-model.trim="textInput"
                        :validation="v$.textInput"
                        :validation-messages="{
                            custom: 'musí být napsán string custom',
                        }"
                        @blur="(...args: any) => onEvent('textInput', 'blur', ...args)"
                        @change="(...args: any) => onEvent('textInput', 'change', ...args)"
                        @update="(...args: any) => onEvent('textInput', 'update', ...args)"
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
                        @blur="(...args: any) => onEvent('textAreaInput', 'blur', ...args)"
                        @change="(...args: any) => onEvent('textAreaInput', 'change', ...args)"
                        @update="(...args: any) => onEvent('textAreaInput', 'update', ...args)"
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
                        @blur="(...args: any) => onEvent('selectInput', 'blur', ...args)"
                        @change="(...args: any) => onEvent('selectInput', 'change', ...args)"
                        @update="(...args: any) => onEvent('selectInput', 'update', ...args)"
                    />
                </InputTester>

                <InputTester
                    :title="'Checkbox input'"
                    :input-value="checkboxInput"
                >
                    <form-input-checkbox
                        v-model="checkboxInput"
                        @blur="(...args: any) => onEvent('checkboxInput', 'blur', ...args)"
                        @change="(...args: any) => onEvent('checkboxInput', 'change', ...args)"
                        @update="(...args: any) => onEvent('checkboxInput', 'update', ...args)"
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
                        @blur="(...args: any) => onEvent('checkboxGroup', 'blur', ...args)"
                        @change="(...args: any) => onEvent('checkboxGroup', 'change', ...args)"
                        @update="(...args: any) => onEvent('checkboxGroup', 'update', ...args)"
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
                        @blur="(...args: any) => onEvent('radioGroup', 'blur', ...args)"
                        @change="(...args: any) => onEvent('radioGroup', 'change', ...args)"
                        @update="(...args: any) => onEvent('radioGroup', 'update', ...args)"
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
                        enable-time
                        @blur="(...args: any) => onEvent('datePicker', 'blur', ...args)"
                        @change="(...args: any) => onEvent('datePicker', 'change', ...args)"
                        @update="(...args: any) => onEvent('datePicker', 'update', ...args)"
                    />
                </InputTester>

                <InputTester
                    :title="'Date picker input with enforced UTC'"
                    :input-value="dateInputEnforcedUTC"
                >
                    <form-input-date-picker
                        label="Datepicker input"
                        v-model.trim="dateInputEnforcedUTC"
                        enable-time
                        enforce-utc
                        @blur="(...args: any) => onEvent('datePicker', 'blur', ...args)"
                        @change="(...args: any) => onEvent('datePicker', 'change', ...args)"
                        @update="(...args: any) => onEvent('datePicker', 'update', ...args)"
                    />
                </InputTester>

                <InputTester
                    :title="'File input'"
                    :input-value="computedFileInputValue"
                >
                    <form-input-file
                        label="File input"
                        v-model="fileInput"
                        :validation="v$.fileInput"
                        :accept="['image/*', '.pdf', '.pDF']"
                        :multiple="true"
                        @blur="(...args: any) => onEvent('fileInput', 'blur', ...args)"
                        @change="(...args: any) => onEvent('fileInput', 'change', ...args)"
                        @update="(...args: any) => onEvent('fileInput', 'update', ...args)"
                    />
                    <p>
                        <b-button
                            variant="primary"
                            @click="fileInput = undefined"
                        >
                            Clear
                        </b-button>
                    </p>
                </InputTester>
            </div>
            <div class="col-12 col-md-4">
                <h4>Events</h4>
                <hr/>
                <div v-for="event in events" :key="JSON.stringify(event)">
                    <p>
                        <strong>{{ event.inputName }}</strong> - {{ event.eventName }}
                    </p>
                    <pre>{{ JSON.stringify(event.args, null, 2) }}</pre>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import { ref, computed, onBeforeMount } from 'vue'
import InputTester from './components/InputTester.vue'

const textInput = ref(null)
const textareaInput = ref(null)
const selectInput = ref(null)
const checkboxInput = ref(null)
const checkboxGroup = ref([])
const radioGroup = ref(null)
const dateInput = ref(null)
const fileInput = ref<File | File[] | undefined | null>(null)
const dateInputEnforcedUTC = ref(null)

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

const vuelidateDetected = ref(false)
const vueI18nDetected = ref(false)
const events = ref<Array<Record<string, any>>>([])

onBeforeMount(() => {
})

const onEvent = (inputName: string, eventName: string, ...args: any): void => {
    events.value.push({ inputName, eventName, args })
}

const computedFileInputValue = computed(() => {
    const fileToObject = (file: File): Record<string, any> => {
        return {
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified
        }
    }
    if (fileInput.value instanceof File) {
        return fileToObject(fileInput.value)
    }
    if (Array.isArray(fileInput.value)) {
        return fileInput.value.map(file => fileToObject(file))
    }
    return null
})

const v$ = useVuelidate({
    textInput: {
        required,
        minLength: minLength(4),
        custom: (value: string) => {
            return value === 'custom'
        }
    },
    textareaInput: { required },
    selectInput: { required },
    checkboxInput: { required },
    checkboxGroup: { required },
    radioGroup: { required },
    dateInput: { required },
    fileInput: { required }
}, {
    textInput,
    textareaInput,
    selectInput,
    checkboxInput,
    checkboxGroup,
    radioGroup,
    dateInput,
    fileInput
})
</script>
