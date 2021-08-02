import { InvalidFieldValueError } from "../errors";

/**
 * Performs client-side validation of the params passed in by the user.
 */
export function validateParams(labelId: string): void {
  if (typeof labelId !== "string") {
    throw new InvalidFieldValueError("labelId", "must be a string.");
  }
}
