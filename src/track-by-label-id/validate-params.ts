import { InvalidFieldValueError } from "../errors";
import { TrackByLabelIdTypes } from ".";

/**
 * Performs client-side validation of the params passed in by the user.
 */
export function validateParams(params: TrackByLabelIdTypes.Params): void {
  if (typeof params.labelId !== "string") {
    throw new InvalidFieldValueError("Params", "must be a string.");
  }
}
