
export function isString(value: unknown) : asserts value is string {
    if(typeof(value) !== 'string') {
        // TODO throw validation Error
    }
}

export function isNonEmptyString(value: unknown) : asserts value is string {
    isString(value);
    if(value.length === 0 ) {
        // TODO throw validation Error
    }
}