import { InvalidFieldValueError } from "../errors";
import { CreateLabelFromRateTypes } from ".";

/**
 * Performs client-side validation of the params passed in by the user.
 */
export function validateParams(params: CreateLabelFromRateTypes.Params): void {
  if (typeof params.rateId !== "string") {
    throw new InvalidFieldValueError("Params", "must be a string.");
  }
}
