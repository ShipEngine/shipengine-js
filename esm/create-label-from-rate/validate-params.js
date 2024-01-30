import { InvalidFieldValueError } from "../errors";
/**
 * Performs client-side validation of the params passed in by the user.
 */
export function validateParams(params) {
    if (typeof params.rateId !== "string") {
        throw new InvalidFieldValueError("Params", "must be a string.");
    }
}
//# sourceMappingURL=validate-params.js.map