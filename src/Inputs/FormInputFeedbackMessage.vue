<template>
    <div class="invalid-feedback">{{ message }}</div>
</template>

<script setup lang="ts">
import type { Validation } from '@vuelidate/core'
import { inject, computed } from 'vue'

const props = defineProps<{
    messages: Record<string, string> | undefined
    validationModel: Validation
}>()

const $t = inject<((message: string, params?: Record<string, any>) => string) | null>('$vfiTranslate', null)

const message = computed(() => {
    const rules = Object.keys(props.validationModel).filter(item => !`${item}`.startsWith('$'))
    for (const ruleName of rules) {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (props?.validationModel?.[ruleName]?.$invalid) {
            if (typeof props.messages?.[ruleName] === 'string') {
                return props.messages[ruleName]
            } else {
                return getDefaultMessage(ruleName, props.validationModel[ruleName])
            }
        }
    }
    return getDefaultMessage()
})

function getDefaultMessage (ruleType?: string, validationRule?: any): string {
    let parameter
    let params: Record<string, any> = {}
    if (validationRule?.$params !== undefined) {
        params = { ...validationRule.$params }
    }

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
                if (typeof validationRule?.$message === 'string') {
                    return (validationRule.$message.startsWith('$t:') === true) ? $t(validationRule.$message.replace('$t:', '')) : validationRule.$message
                }
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
            if (typeof validationRule?.$message === 'string') {
                return validationRule.$message
            }
            return 'Chybně vyplněná hodnota.'
    }
}
</script>
