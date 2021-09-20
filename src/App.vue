<template>
    <div class="container py-5">
        <h1>Usage example</h1>
        <hr/>

        <fieldset
            :class="{'is-invalid': !isValid, 'is-valid': isValid, 'mt-5': true}"
            v-if="!redraw"
        >
            <div class="row">
                <div class="col-12 col-md-2">
                    <form-input
                        label="Titul před"
                        v-model.trim="form.prenominal"
                        :id="'prenominal'"
                        :read-only="form.prenominal !== null && form.prenominal.length > 3"
                    />
                </div>
                <div class="col-12 col-md-4">
                    <form-input
                        label="Jméno"
                        v-model.trim="form.firstName"
                        :validation="$v.form.firstName"
                    />
                </div>
                <div class="col-12 col-md-4">
                    <form-input
                        label="Příjmení"
                        v-model.trim="form.lastName"
                        :validation="$v.form.lastName"
                    />
                </div>
                <div class="col-12 col-md-2">
                    <form-input
                        label="Titul za"
                        v-model.trim="form.postnominal"
                    />
                </div>
            </div>

            <div class="row">
                <div class="col-12 col-md-3">
                    <form-input
                        label="RČ"
                        :formatter="birthNumberFormatter"
                        v-model.trim="form.birthNumber"
                        :validation="$v.form.birthNumber"
                        :validation-messages="{ custom: 'RČ musí být alespoň 9 znaků dlouhé.' }"
                        @input="onBirthNumberInput"
                    />
                    <b-form-group>
                        <b-form-checkbox v-model="form.noBirthNumber">
                            není přiděleno rodné číslo
                        </b-form-checkbox>
                    </b-form-group>
                </div>
                <div class="col-12 col-md-3">
                    <form-input-select
                        label="Země vydání RČ / narození"
                        v-model="form.birthNumberCountry"
                        :validation="$v.form.birthNumberCountry"
                        :options="countries"
                        :read-only="true"
                    />
                </div>
                <div class="col-12 col-md-3">
                    <form-input-date-picker
                        label="Datum narození"
                        v-model="form.dateOfBirth"
                        :validation="$v.form.dateOfBirth"
                        :max-date="new Date()"
                        :hint="birthDateHint"
                    >
                        <template #input-text>
                            <a href="javascript:void(0)"
                                @click.prevent="onSetBirthDate"
                            >
                                <small>Nastavit dle RČ</small>
                            </a>
                        </template>
                    </form-input-date-picker>
                </div>
                <div class="col-12 col-md-3">
                    <form-input-select
                        label="Pohlaví"
                        v-model="form.gender"
                        :validation="$v.form.gender"
                        :options="genderOptions"
                    />
                    <form-input-checkbox-group
                        label="Pohlaví"
                        v-model="form.genderTest"
                        :validation="$v.form.genderTest"
                        :options="genderOptions"
                    />
                </div>
            </div>

            <slot name="duplicity"></slot>

            <div class="row">
                <div class="col-12 col-md-4">
                    <form-input
                        label="Místo narození"
                        id="placeofbirth"
                        v-model.trim="form.placeOfBirth"
                        :validation="$v.form.placeOfBirth"
                    />
                </div>
                <div class="col-12 col-md-4">
                    <form-input-select
                        label="Občanství"
                        id="citizenship"
                        v-model="form.citizenship"
                        :validation="$v.form.citizenship"
                        :options="countries"
                    />
                </div>
                <div class="col-12 col-md-4">
                    <form-input-select
                        :multi="true"
                        label="Daňový domicil"
                        v-model="form.taxDomicile"
                        :validation="$v.form.taxDomicile"
                        :options="countries"
                    />
                </div>
            </div>

            <b-form-group>
                <b-form-checkbox
                    v-model="form.politician"
                >
                    osoba je politicky exponovanou
                </b-form-checkbox>
            </b-form-group>
        </fieldset>

        <pre class="bg-light my-5 p-4">{{JSON.stringify(form, null, 4)}}</pre>
    </div>
</template>

<script>
import { required, requiredIf } from 'vuelidate/lib/validators'
import { BFormCheckbox } from 'bootstrap-vue'

const countries = {
    CZE: 'Česká republika'
}
const genderOptions = {
    male: 'Muž',
    female: 'Žena'
}

export default {
    name: 'App',
    components: {
        BFormCheckbox
    },
    props: {
        heading: {
            type: String,
            required: false,
            default () {
                return 'Osobní údaje'
            }
        },
        value: {
            type: Object,
            required: false,
            default: () => {
                return {
                    prenominal: null,
                    firstName: null,
                    lastName: null,
                    postnominal: null,
                    birthNumber: null,
                    dateOfBirth: new Date(),
                    noBirthNumber: false,
                    birthNumberCountry: null,
                    taxDomicile: null,
                    placeOfBirth: null,
                    citizenship: null,
                    gender: null,
                    politician: false
                }
            }
        }
    },
    data () {
        const dataset = {
            form: { ...JSON.parse(JSON.stringify(this.value)), genderTest: [] },
            redraw: false,
            isValid: true
        }
        return dataset
    },
    computed: {
        countries () {
            return countries
        },
        genderOptions () {
            return genderOptions
        },
        birthDateHint () {
            if (this.birthDateFromBirthNumber() instanceof Date) {
                const fixedDate = new Date(this.form.dateOfBirth.valueOf())
                fixedDate.setHours(12, 0, 0, 0)
                if (fixedDate.valueOf() !== this.birthDateFromBirthNumber().valueOf()) {
                    return 'Uvedené RČ neodpovídá datu narození. Datum dle RČ: ' + this.birthDateFromBirthNumber().toLocaleDateString()
                }
            }
            return undefined
        },
        minBirthDate () {
            const minDate = new Date()
            minDate.setHours(12, 0, 0, 0)
            minDate.setFullYear(minDate.getFullYear() - 18)
            return minDate
        }
    },
    methods: {
        onBirthNumberInput () {
            if (!this.$v.form.birthNumber.$invalid && (this.birthDateFromBirthNumber() instanceof Date)) {
                this.onSetBirthDate()
            }
        },
        birthNumberFormatter (value) {
            const tmp = value.replace(/[\s\D]/g, '')
            return `${tmp.slice(0, 6)}/${tmp.slice(6, 10)}`
        },
        onSetBirthDate () {
            if (this.birthDateFromBirthNumber() instanceof Date) {
                this.form.dateOfBirth = new Date(this.birthDateFromBirthNumber().valueOf())
                this.$v.form.dateOfBirth.$touch()
            }
        },
        birthDateFromBirthNumber () {
            if (this.$v.form.birthNumber.$invalid) {
                return null
            }
            const birthNumber = `${this.form.birthNumber}`
            const base = birthNumber.slice(0, 6)
            let year = parseInt(base.slice(0, 2))
            if (birthNumber.length === 11 && year < 54) {
                year += 2000
            } else {
                year += 1900
            }
            let month = parseInt(base.slice(2, 4))
            if (month > 12) {
                month -= 50
            }
            month -= 1
            const day = parseInt(base.slice(4, 6))
            // day += 1
            const birthDate = new Date(year, month, day, 12, 0, 0, 0)
            return birthDate
        }
    },
    validations: {
        form: {
            firstName: {
                required
            },
            lastName: {
                required
            },
            birthNumber: {
                required: requiredIf(function () {
                    return !this.form.noBirthNumber
                }),
                custom (value) {
                    return (!this.form.noBirthNumber) ? (`${value}`).replace(/\D/ig, '').trim().length >= 9 : true
                }
            },
            dateOfBirth: {
                required
            },
            birthNumberCountry: {
                required
            },
            taxDomicile: {
                required
            },
            citizenship: {
                required
            },
            placeOfBirth: {
                required
            },
            gender: {
                required
            }
        }
    }
}
</script>

<style lang="scss">
.form-group-required {
    & > legend, & > label {
        &::after {
            content: " *";
            display: inline;
            color: red;
        }
    }
}
</style>
