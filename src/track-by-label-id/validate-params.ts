import { InvalidFieldValueError } from "../errors";
import { TrackPackageByLabelIdTypes } from ".";

/**
 * Performs client-side validation of the params passed in by the user.
 */
export function validateParams(
  params: TrackPackageByLabelIdTypes.Params
): void {
  if (typeof params.labelId !== "string") {
    throw new InvalidFieldValueError("Params", "must be a string.");
  }

  if (!params.labelId.startsWith("se-")) {
    throw new InvalidFieldValueError("Params", "must be a valid label id.");
  }
}
