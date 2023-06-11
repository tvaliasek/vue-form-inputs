export const prefixWithZero = (part: number): string => `${(part < 10) ? '0' : ''}${part}`

export const dateFormat = (input: string | Date, locale: string, enforceUtc: boolean): string => {
    if (input instanceof Date) {
        return input.toLocaleDateString(locale, { timeZone: enforceUtc ? 'UTC' : undefined, dateStyle: 'medium' })
    }
    return input
}

export const dateTimeFormat = (input: string | Date, locale: string, enforceUtc: boolean): string => {
    if (input instanceof Date) {
        return input.toLocaleString(locale, { timeZone: enforceUtc ? 'UTC' : undefined, dateStyle: 'medium', timeStyle: 'short' })
    }
    return input
}
