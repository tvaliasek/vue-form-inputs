<template>
    <span>{{ message }}</span>
</template>

<script lang="ts">
import type { Validation } from '@vuelidate/core'
import type { PropType } from 'vue'
import { defineComponent, getCurrentInstance } from 'vue'

export default defineComponent({
    name: 'FormInputFeedbackMessage',
    props: {
        messages: {
            type: Object as PropType<Record<string, any> | undefined>,
            required: false
        },
        validationModel: {
            type: Object as PropType<Validation>,
            required: true
        }
    },
    setup () {
        const instance = getCurrentInstance()
        const translator = (): unknown => instance?.appContext.config.globalProperties?.$t ?? null
        return { translator }
    },
    computed: {
        ruleNames () {
            return [...new Set(
                [
                    'required', 'requiredIf', 'requiredUnless',
                    'minLength', 'maxLength', 'minValue', 'maxValue',
                    'between', 'alpha', 'alphaNum', 'numeric',
                    'integer', 'decimal', 'email', 'ipAddress',
                    'macAddress', 'sameAs', 'url', 'validated_email'
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                ].concat((this.messages) ? Object.keys(this.messages) : []))
            ]
        },
        message (): string {
            const rules = Object.keys(this.validationModel).filter(item => !`${item}`.startsWith('$'))
            for (const ruleName of rules) {
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                if (this.ruleNames.includes(ruleName) && this.validationModel[ruleName].$invalid) {
                    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain, @typescript-eslint/strict-boolean-expressions
                    if (this.messages && this.messages[ruleName]) {
                        return this.messages[ruleName]
                    } else {
                        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                        return this.getDefaultMessage(ruleName, this.validationModel[ruleName].$params || {})
                    }
                }
            }
            return this.getDefaultMessage()
        }
    },
    methods: {
        getDefaultMessage (ruleType?: string, params?: Record<string, any>) {
            let parameter
            if (params === undefined) {
                params = {}
            }
            const $t = this.translator()
            if (typeof $t === 'function') {
                switch (ruleType) {
                    case 'required':
                    case 'requiredIf':
                    case 'requiredUnless':
                        return $t('vueFormInputs.feedback.required')
                    case 'minLength':
                        return $t('vueFormInputs.feedback.minLength', { minLength: params.min })
                    case 'maxLength':
                        return $t('vueFormInputs.feedback.maxLength', { maxLength: params.max })
                    case 'minValue':
                        // eslint-disable-next-line no-case-declarations
                        parameter = (params.min instanceof Date) ? params.min.toLocaleDateString() : params.min
                        return $t('vueFormInputs.feedback.minValue', { minValue: parameter })
                    case 'maxValue':
                        // eslint-disable-next-line no-case-declarations
                        parameter = (params.max instanceof Date) ? params.max.toLocaleDateString() : params.max
                        return $t('vueFormInputs.feedback.maxValue', { maxValue: parameter })
                    case 'between':
                        return $t('vueFormInputs.feedback.between', { betweenMin: params.min, betweenMax: params.max })
                    case 'alpha':
                        return $t('vueFormInputs.feedback.alpha')
                    case 'alphaNum':
                        return $t('vueFormInputs.feedback.alphaNum')
                    case 'numeric':
                        return $t('vueFormInputs.feedback.numeric')
                    case 'integer':
                        return $t('vueFormInputs.feedback.integer')
                    case 'decimal':
                        return $t('vueFormInputs.feedback.decimal')
                    case 'email':
                        return $t('vueFormInputs.feedback.email')
                    case 'ipAddress':
                        return $t('vueFormInputs.feedback.ipAddress')
                    case 'macAddress':
                        return $t('vueFormInputs.feedback.macAddress')
                    case 'sameAs':
                        return $t('vueFormInputs.feedback.sameAs')
                    case 'url':
                        return $t('vueFormInputs.feedback.url')
                    case 'validated_email':
                    case 'validatedEmail':
                        return $t('vueFormInputs.feedback.validatedEmail')
                    default:
                        return $t('vueFormInputs.feedback.invalidValue')
                }
            }
            switch (ruleType) {
                case 'required':
                case 'requiredIf':
                case 'requiredUnless':
                    return 'Toto pole je nutné vyplnit.'
                case 'minLength':
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    return `Hodnota musí být minimálně ${params.min} znaků dlouhá.`
                case 'maxLength':
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    return `Hodnota musí být maximálně ${params.max} znaků dlouhá.`
                case 'minValue':
                    // eslint-disable-next-line no-case-declarations
                    parameter = (params.min instanceof Date) ? params.min.toLocaleDateString() : params.min
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    return `Hodnota musí být minimálně ${parameter}.`
                case 'maxValue':
                    // eslint-disable-next-line no-case-declarations
                    parameter = (params.max instanceof Date) ? params.max.toLocaleDateString() : params.max
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    return `Hodnota musí být maximálně ${parameter}.`
                case 'between':
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    return `Hodnota musí být mezi ${params.min} a ${params.max}.`
                case 'alpha':
                    return 'Jsou povoleny pouze písmena.'
                case 'alphaNum':
                    return 'Jsou povoleny pouze písmena a čísla.'
                case 'numeric':
                    return 'Jsou povoleny pouze čísla.'
                case 'integer':
                    return 'Jsou povolena pouze celá čísla.'
                case 'decimal':
                    return 'Jsou povolena pouze desetinná čísla.'
                case 'email':
                    return 'Chybný formát emailové adresy.'
                case 'ipAddress':
                    return 'Chybný formát IP adresy.'
                case 'macAddress':
                    return 'Chybný formát MAC adresy.'
                case 'sameAs':
                    return 'Hodnota není shodná.'
                case 'url':
                    return 'Chybný formát URL adresy.'
                case 'validated_email':
                case 'validatedEmail':
                    return 'Nefunkční nebo chybná emailová adresa.'
                default:
                    return 'Chybně vyplněná hodnota.'
            }
        }
    }
})
</script>
