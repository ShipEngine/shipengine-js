import { InvalidFieldValueError } from "../errors";
/**
 * Performs client-side validation of the address params that's passed-in by the user.
 */
export function validateParams(params) {
    if (!Array.isArray(params)) {
        throw new InvalidFieldValueError("Params", "must be an array.");
    }
}
//# sourceMappingURL=validate-params.js.map