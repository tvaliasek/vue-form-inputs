import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'

import { FormInputsPlugin } from '.'

const app = createApp(App)
const i18n = createI18n({
    legacy: false,
    locale: 'en',
    messages: {
        cs: {
            vueFormInputs: {
                feedback: {
                    required: 'Toto pole je nutné vyplnit.',
                    minLength: 'Hodnota musí být minimálně {minLength} znaků dlouhá.',
                    maxLength: 'Hodnota musí být maximálně {maxLength} znaků dlouhá.',
                    minValue: 'Hodnota musí být minimálně {minValue}.',
                    maxValue: 'Hodnota musí být maximálně {maxValue}.',
                    between: 'Hodnota musí být mezi {betweenMin} a {betweenMax}.',
                    alpha: 'Jsou povoleny pouze písmena.',
                    alphaNum: 'Jsou povoleny pouze písmena a čísla.',
                    numeric: 'Jsou povoleny pouze čísla.',
                    integer: 'Jsou povolena pouze celá čísla.',
                    decimal: 'Jsou povolena pouze desetinná čísla.',
                    email: 'Chybný formát emailové adresy.',
                    ipAddress: 'Chybný formát IP adresy.',
                    macAddress: 'Chybný formát MAC adresy.',
                    sameAs: 'Hodnota není shodná.',
                    url: 'Chybný formát URL adresy.',
                    validatedEmail: 'Nefunkční nebo chybná emailová adresa.',
                    invalidValue: 'Chybně vyplněná hodnota.'
                }
            }
        },
        en: {
            vueFormInputs: {
                feedback: {
                    required: 'This field must be filled.',
                    minLength: 'The value must be at least {minLength} characters long.',
                    maxLength: 'The value must be at most {maxLength} characters long.',
                    minValue: 'The value must be at least {minValue}.',
                    maxValue: 'The value must be at most {maxValue}.',
                    between: 'The value must be between {betweenMin} and {betweenMax}.',
                    alpha: 'Only letters are allowed.',
                    alphaNum: 'Only letters and numbers are allowed.',
                    numeric: 'Only numbers are allowed.',
                    integer: 'Only whole numbers are allowed.',
                    decimal: 'Only decimal numbers are allowed.',
                    email: 'Incorrect email address format.',
                    ipAddress: 'Incorrect IP address format.',
                    macAddress: 'Incorrect MAC address format.',
                    sameAs: 'The values are not identical.',
                    url: 'Incorrect URL address format.',
                    validatedEmail: 'Broken or incorrect email address.',
                    invalidValue: 'Incorrectly filled value.'
                }
            }
        }
    }
})

app.use(FormInputsPlugin())
app.use(i18n)

app.mount('#app')
