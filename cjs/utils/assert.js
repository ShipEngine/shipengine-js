"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArrayOfStrings = exports.isArray = exports.isPositiveInteger = exports.isNonNegativeInteger = exports.isInteger = exports.isNumber = exports.isBoolean = exports.isPOJO = exports.isNonWhitespaceString = exports.isNonEmptyString = exports.isString = exports.isSet = void 0;
const errors_1 = require("../errors");
/**
 * Asserts that the given value is set (that is, not `null` or `undefined`).
 */
function isSet(field, value) {
    if (value === null || value === undefined) {
        throw new errors_1.FieldValueRequiredError(field);
    }
}
exports.isSet = isSet;
/**
 * Asserts that the given value is a string, including an empty or whitespace string.
 */
function isString(field, value) {
    isSet(field, value);
    if (typeof value !== "string") {
        throw new errors_1.InvalidFieldValueError(field, "must be a string.", value);
    }
}
exports.isString = isString;
/**
 * Asserts that the given value is a string with at least one character,
 * including whitespace characters.
 */
function isNonEmptyString(field, value) {
    isString(field, value);
    if (value.length === 0) {
        throw new errors_1.InvalidFieldValueError(field, "cannot be empty.", value);
    }
}
exports.isNonEmptyString = isNonEmptyString;
/**
 * Asserts that the given value is a string with at least one non-whitespace character.
 */
function isNonWhitespaceString(field, value) {
    isNonEmptyString(field, value);
    if (value.trim().length === 0) {
        throw new errors_1.InvalidFieldValueError(field, "cannot be all whitespace.", value);
    }
}
exports.isNonWhitespaceString = isNonWhitespaceString;
/**
 * Asserts that the given value is a POJO (plain old javascript object).
 */
function isPOJO(field, value) {
    isSet(field, value);
    if (typeof value !== "object" || Array.isArray(value)) {
        throw new errors_1.InvalidFieldValueError(field, "must be an object.", value);
    }
}
exports.isPOJO = isPOJO;
/**
 * Asserts that the given value is a boolean.
 */
function isBoolean(field, value) {
    isSet(field, value);
    if (typeof value !== "boolean") {
        throw new errors_1.InvalidFieldValueError(field, "must be true or false.", value);
    }
}
exports.isBoolean = isBoolean;
/**
 * Asserts that the given value is a number, including positive, negative,
 * integer, float, and infinity.
 */
function isNumber(field, value) {
    isSet(field, value);
    if (typeof value !== "number" || Number.isNaN(value)) {
        throw new errors_1.InvalidFieldValueError(field, "must be a number.", value);
    }
}
exports.isNumber = isNumber;
/**
 * Asserts that the given value is an integer, including positive and negative integers.
 */
function isInteger(field, value) {
    isNumber(field, value);
    if (!Number.isInteger(value)) {
        throw new errors_1.InvalidFieldValueError(field, "must be a whole number.", value);
    }
}
exports.isInteger = isInteger;
/**
 * Asserts that the given value is an integer of at least zero.
 */
function isNonNegativeInteger(field, value) {
    isInteger(field, value);
    if (value < 0) {
        throw new errors_1.InvalidFieldValueError(field, "must be zero or greater.", value);
    }
}
exports.isNonNegativeInteger = isNonNegativeInteger;
/**
 * Asserts that the given value is an integer of at least 1.
 */
function isPositiveInteger(field, value) {
    isInteger(field, value);
    if (value < 1) {
        throw new errors_1.InvalidFieldValueError(field, "must be greater than zero.", value);
    }
}
exports.isPositiveInteger = isPositiveInteger;
/**
 * Asserts that the given value is an array, including empty arrays.
 */
function isArray(field, value) {
    isSet(field, value);
    if (!Array.isArray(value)) {
        throw new errors_1.InvalidFieldValueError(field, "must be an array.", value);
    }
}
exports.isArray = isArray;
/**
 * Asserts that the given value is an array, including empty arrays.
 */
function isArrayOfStrings(field, value) {
    isArray(field, value);
    for (const item of value) {
        if (typeof item !== "string") {
            throw new errors_1.InvalidFieldValueError(field, "can only contain strings.", value);
        }
    }
}
exports.isArrayOfStrings = isArrayOfStrings;
//# sourceMappingURL=assert.js.map