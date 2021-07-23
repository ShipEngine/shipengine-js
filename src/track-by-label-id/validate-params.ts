import { InvalidFieldValueError } from "../errors";
import { TrackPackageByLabelIDTypes } from ".";

/**
 * Performs client-side validation of the address params that's passed-in by the user.
 */
export function validateParams(
  params: TrackPackageByLabelIDTypes.Params
): void {
  if (typeof params.labelId !== "string") {
    throw new InvalidFieldValueError("Params", "must be a string.");
  }

  if (!params.labelId.startsWith("se-")) {
    throw new InvalidFieldValueError("Params", "must be a valid label id.");
  }
}
