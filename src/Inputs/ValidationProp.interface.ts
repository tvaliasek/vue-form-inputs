export interface ValidationProp {
    $touch: () => void
    $reset: () => void
    $invalid: boolean
    $dirty: boolean
    [key: string]: any
}
