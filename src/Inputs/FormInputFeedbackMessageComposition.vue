<template>
    <span>{{message}}</span>
</template>

<script setup lang="ts">
import type { Validation } from '@vuelidate/core'
import { computed, unref } from 'vue'
import { useI18n } from 'vue-i18n'

export interface ComponentProps {
    validationModel?: Validation
    messages?: Record<string, any>
}

const { t } = useI18n()

const props = defineProps<ComponentProps>()
const ruleNames = computed(() => [
    ...new Set([
        'required', 'requiredIf', 'requiredUnless',
        'minLength', 'maxLength', 'minValue', 'maxValue',
        'between', 'alpha', 'alphaNum', 'numeric',
        'integer', 'decimal', 'email', 'ipAddress',
        'macAddress', 'sameAs', 'url', 'validated_email'
    ].concat((unref(props.messages) != null) ? Object.keys(unref(props.messages ?? {})) : []))
])
const message = computed(() => {
    const validationModel = unref(props.validationModel)
    if (validationModel === undefined) {
        return ''
    }
    const rules = Object.keys(validationModel).filter(item => !`${item}`.startsWith('$'))
    const messages = unref(props.messages)
    for (const ruleName of rules) {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (ruleNames.value.includes(ruleName) && validationModel[ruleName].$invalid) {
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-optional-chain
            if (messages && messages[ruleName]) {
                return messages[ruleName]
            } else {
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                return getDefaultMessage(ruleName, validationModel[ruleName]?.$params || {})
            }
        }
    }
    return getDefaultMessage()
})

function getDefaultMessage (ruleType?: string, params: Record<string, any> = {}): string {
    let parameter
    switch (ruleType) {
        case 'required':
        case 'requiredIf':
        case 'requiredUnless':
            return t('vueFormInputs.feedback.required')
        case 'minLength':
            return t('vueFormInputs.feedback.minLength', { minLength: params.min })
        case 'maxLength':
            return t('vueFormInputs.feedback.maxLength', { maxLength: params.max })
        case 'minValue':
            // eslint-disable-next-line no-case-declarations
            parameter = (params.min instanceof Date) ? params.min.toLocaleDateString() : params.min
            return t('vueFormInputs.feedback.minValue', { minValue: parameter })
        case 'maxValue':
            // eslint-disable-next-line no-case-declarations
            parameter = (params.max instanceof Date) ? params.max.toLocaleDateString() : params.max
            return t('vueFormInputs.feedback.maxValue', { maxValue: parameter })
        case 'between':
            return t('vueFormInputs.feedback.between', { betweenMin: params.min, betweenMax: params.max })
        case 'alpha':
            return t('vueFormInputs.feedback.alpha')
        case 'alphaNum':
            return t('vueFormInputs.feedback.alphaNum')
        case 'numeric':
            return t('vueFormInputs.feedback.numeric')
        case 'integer':
            return t('vueFormInputs.feedback.integer')
        case 'decimal':
            return t('vueFormInputs.feedback.decimal')
        case 'email':
            return t('vueFormInputs.feedback.email')
        case 'ipAddress':
            return t('vueFormInputs.feedback.ipAddress')
        case 'macAddress':
            return t('vueFormInputs.feedback.macAddress')
        case 'sameAs':
            return t('vueFormInputs.feedback.sameAs')
        case 'url':
            return t('vueFormInputs.feedback.url')
        case 'validated_email':
        case 'validatedEmail':
            return t('vueFormInputs.feedback.validatedEmail')
        default:
            return t('vueFormInputs.feedback.invalidValue')
    }
}
</script>
