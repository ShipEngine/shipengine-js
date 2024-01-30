/**
 * Asserts that the given value is set (that is, not `null` or `undefined`).
 */
export declare function isSet(field: string, value: unknown): asserts value is string;
/**
 * Asserts that the given value is a string, including an empty or whitespace string.
 */
export declare function isString(field: string, value: unknown): asserts value is string;
/**
 * Asserts that the given value is a string with at least one character,
 * including whitespace characters.
 */
export declare function isNonEmptyString(field: string, value: unknown): asserts value is string;
/**
 * Asserts that the given value is a string with at least one non-whitespace character.
 */
export declare function isNonWhitespaceString(field: string, value: unknown): asserts value is string;
/**
 * Asserts that the given value is a POJO (plain old javascript object).
 */
export declare function isPOJO(field: string, value: unknown): asserts value is Record<string, unknown>;
/**
 * Asserts that the given value is a boolean.
 */
export declare function isBoolean(field: string, value: unknown): asserts value is boolean;
/**
 * Asserts that the given value is a number, including positive, negative,
 * integer, float, and infinity.
 */
export declare function isNumber(field: string, value: unknown): asserts value is number;
/**
 * Asserts that the given value is an integer, including positive and negative integers.
 */
export declare function isInteger(field: string, value: unknown): asserts value is number;
/**
 * Asserts that the given value is an integer of at least zero.
 */
export declare function isNonNegativeInteger(field: string, value: unknown): asserts value is number;
/**
 * Asserts that the given value is an integer of at least 1.
 */
export declare function isPositiveInteger(field: string, value: unknown): asserts value is number;
/**
 * Asserts that the given value is an array, including empty arrays.
 */
export declare function isArray(field: string, value: unknown): asserts value is Array<unknown>;
/**
 * Asserts that the given value is an array, including empty arrays.
 */
export declare function isArrayOfStrings(field: string, value: unknown): asserts value is string[];
