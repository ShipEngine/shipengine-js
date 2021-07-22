import { InvalidFieldValueError } from "../errors";
import { ValidateAddressesTypes } from ".";

/**
 * Performs client-side validation of the address params that's passed-in by the user.
 */
export function validateParams(params: ValidateAddressesTypes.Params): void {
  if (!Array.isArray(params)) {
    throw new InvalidFieldValueError("Params", "must be an array.");
  }
}
