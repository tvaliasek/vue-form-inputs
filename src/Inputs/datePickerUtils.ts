export const prefixWithZero = (part: number): string => `${(part < 10) ? '0' : ''}${part}`

export const dateFormat = (input: string | Date): string => {
    if (input instanceof Date) {
        return `${input.getDate()}.${input.getMonth() + 1}. ${input.getFullYear()}`
    }
    return input
}

export const dateTimeFormat = (input: string | Date): string => {
    if (input instanceof Date) {
        const datePart = dateFormat(input)
        return `${datePart} - ${input.getHours()}:${prefixWithZero(input.getMinutes())}`
    }
    return input
}

export const textToDate = (input: string | Date): Date | null => {
    if (input instanceof Date) {
        return input
    }
    const parts = `${input}`.replace(/\s/ig, '').split('.')
    if (parts.length >= 3) {
        const day = parseInt(parts[0])
        const month = parseInt(parts[1])
        const year = parseInt(`${parts[2]}`.substring(0, 4))
        const timeParts = `${parts[2]}`.substring(4, 5).split(':').map(item => parseInt(item)).filter(item => !isNaN(item))

        if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
            let date: string | Date = `${year}-${prefixWithZero(month)}-${prefixWithZero(day)}`
            if (timeParts.length >= 2) {
                date = `${date}T${prefixWithZero(timeParts[0])}:${prefixWithZero(timeParts[1])}:00.000Z`
            } else {
                date = `${date}T00:00:00.000Z`
            }
            date = new Date(date)
            if (date instanceof Date && !isNaN(date.valueOf())) {
                return date
            }
        }
    }
    return null
}
