<template>
    <span>{{message}}</span>
</template>

<script>
export default {
    name: 'FormInputFeedbackMessage',
    props: {
        messages: {
            type: Object,
            required: false
        },
        validationModel: {
            type: Object,
            required: true
        }
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
                ].concat((this.messages) ? Object.keys(this.messages) : []))
            ]
        },
        message () {
            const rules = Object.keys(this.validationModel).filter(item => !`${item}`.startsWith('$'))
            for (const ruleName of rules) {
                if (this.ruleNames.includes(ruleName) && this.validationModel[ruleName].$invalid) {
                    if (this.messages && this.messages[ruleName]) {
                        return this.messages[ruleName]
                    } else {
                        return this.getDefaultMessage(ruleName, this.validationModel[ruleName].$params || {})
                    }
                }
            }
            return this.getDefaultMessage()
        }
    },
    methods: {
        getDefaultMessage (ruleType, params) {
            let parameter
            if (this.$i18n !== undefined && this.$t !== undefined) {
                switch (ruleType) {
                    case 'required':
                    case 'requiredIf':
                    case 'requiredUnless':
                        return this.$t('vueFormInputs.feedback.required')
                    case 'minLength':
                        return this.$t('vueFormInputs.feedback.minLength', { minLength: params.min })
                    case 'maxLength':
                        return this.$t('vueFormInputs.feedback.maxLength', { maxLength: params.max })
                    case 'minValue':
                        // eslint-disable-next-line no-case-declarations
                        parameter = (params.min instanceof Date) ? params.min.toLocaleDateString() : params.min
                        return this.$t('vueFormInputs.feedback.minValue', { minValue: parameter })
                    case 'maxValue':
                        // eslint-disable-next-line no-case-declarations
                        parameter = (params.max instanceof Date) ? params.max.toLocaleDateString() : params.max
                        return this.$t('vueFormInputs.feedback.maxValue', { maxValue: parameter })
                    case 'between':
                        return this.$t('vueFormInputs.feedback.between', { betweenMin: params.min, betweenMax: params.max })
                    case 'alpha':
                        return this.$t('vueFormInputs.feedback.alpha')
                    case 'alphaNum':
                        return this.$t('vueFormInputs.feedback.alphaNum')
                    case 'numeric':
                        return this.$t('vueFormInputs.feedback.numeric')
                    case 'integer':
                        return this.$t('vueFormInputs.feedback.integer')
                    case 'decimal':
                        return this.$t('vueFormInputs.feedback.decimal')
                    case 'email':
                        return this.$t('vueFormInputs.feedback.email')
                    case 'ipAddress':
                        return this.$t('vueFormInputs.feedback.ipAddress')
                    case 'macAddress':
                        return this.$t('vueFormInputs.feedback.macAddress')
                    case 'sameAs':
                        return this.$t('vueFormInputs.feedback.sameAs')
                    case 'url':
                        return this.$t('vueFormInputs.feedback.url')
                    case 'validated_email':
                    case 'validatedEmail':
                        return this.$t('vueFormInputs.feedback.validatedEmail')
                    default:
                        return this.$t('vueFormInputs.feedback.invalidValue')
                }
            }
            switch (ruleType) {
                case 'required':
                case 'requiredIf':
                case 'requiredUnless':
                    return 'Toto pole je nutné vyplnit.'
                case 'minLength':
                    return `Hodnota musí být minimálně ${params.min} znaků dlouhá.`
                case 'maxLength':
                    return `Hodnota musí být maximálně ${params.max} znaků dlouhá.`
                case 'minValue':
                    // eslint-disable-next-line no-case-declarations
                    parameter = (params.min instanceof Date) ? params.min.toLocaleDateString() : params.min
                    return `Hodnota musí být minimálně ${parameter}.`
                case 'maxValue':
                    // eslint-disable-next-line no-case-declarations
                    parameter = (params.max instanceof Date) ? params.max.toLocaleDateString() : params.max
                    return `Hodnota musí být maximálně ${parameter}.`
                case 'between':
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

}
</script>
