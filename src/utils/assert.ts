import { FieldValueRequiredError, InvalidFieldValueError } from "../errors";

/**
 * Asserts that the given value is set (that is, not `null` or `undefined`).
 */
export function isSet(field: string, value: unknown): asserts value is string {
  if (value === null || value === undefined) {
    throw new FieldValueRequiredError(field);
  }
}

/**
 * Asserts that the given value is a string, including an empty or whitespace string.
 */
export function isString(
  field: string,
  value: unknown
): asserts value is string {
  isSet(field, value);

  if (typeof value !== "string") {
    throw new InvalidFieldValueError(field, "must be a string.", value);
  }
}

/**
 * Asserts that the given value is a string with at least one character,
 * including whitespace characters.
 */
export function isNonEmptyString(
  field: string,
  value: unknown
): asserts value is string {
  isString(field, value);

  if (value.length === 0) {
    throw new InvalidFieldValueError(field, "cannot be empty.", value);
  }
}

/**
 * Asserts that the given value is a string with at least one non-whitespace character.
 */
export function isNonWhitespaceString(
  field: string,
  value: unknown
): asserts value is string {
  isNonEmptyString(field, value);

  if (value.trim().length === 0) {
    throw new InvalidFieldValueError(field, "cannot be all whitespace.", value);
  }
}

/**
 * Asserts that the given value is a POJO (plain old javascript object).
 */
export function isPOJO(
  field: string,
  value: unknown
): asserts value is Record<string, unknown> {
  isSet(field, value);

  if (typeof value !== "object" || Array.isArray(value)) {
    throw new InvalidFieldValueError(field, "must be an object.", value);
  }
}

/**
 * Asserts that the given value is a boolean.
 */
export function isBoolean(
  field: string,
  value: unknown
): asserts value is boolean {
  isSet(field, value);

  if (typeof value !== "boolean") {
    throw new InvalidFieldValueError(field, "must be true or false.", value);
  }
}

/**
 * Asserts that the given value is a number, including positive, negative,
 * integer, float, and infinity.
 */
export function isNumber(
  field: string,
  value: unknown
): asserts value is number {
  isSet(field, value);

  if (typeof value !== "number" || Number.isNaN(value)) {
    throw new InvalidFieldValueError(field, "must be a number.", value);
  }
}

/**
 * Asserts that the given value is an integer, including positive and negative integers.
 */
export function isInteger(
  field: string,
  value: unknown
): asserts value is number {
  isNumber(field, value);

  if (!Number.isInteger(value)) {
    throw new InvalidFieldValueError(field, "must be a whole number.", value);
  }
}

/**
 * Asserts that the given value is an integer of at least zero.
 */
export function isNonNegativeInteger(
  field: string,
  value: unknown
): asserts value is number {
  isInteger(field, value);

  if (value < 0) {
    throw new InvalidFieldValueError(field, "must be zero or greater.", value);
  }
}

/**
 * Asserts that the given value is an integer of at least 1.
 */
export function isPositiveInteger(
  field: string,
  value: unknown
): asserts value is number {
  isInteger(field, value);

  if (value < 1) {
    throw new InvalidFieldValueError(
      field,
      "must be greater than zero.",
      value
    );
  }
}

/**
 * Asserts that the given value is an array, including empty arrays.
 */
export function isArray(
  field: string,
  value: unknown
): asserts value is Array<unknown> {
  isSet(field, value);

  if (!Array.isArray(value)) {
    throw new InvalidFieldValueError(field, "must be an array.", value);
  }
}

/**
 * Asserts that the given value is an array, including empty arrays.
 */
export function isArrayOfStrings(
  field: string,
  value: unknown
): asserts value is string[] {
  isArray(field, value);

  for (const item of value) {
    if (typeof item !== "string") {
      throw new InvalidFieldValueError(
        field,
        "can only contain strings.",
        value
      );
    }
  }
}
