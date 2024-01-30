import { InvalidFieldValueError } from "../errors";
/**
 * Performs client-side validation of the params passed in by the user.
 */
export function validateParams(labelId) {
    if (typeof labelId !== "string") {
        throw new InvalidFieldValueError("labelId", "must be a string.");
    }
}
//# sourceMappingURL=validate-params.js.map