import { InvalidFieldValueError } from "../errors";

/**
 * Performs client-side validation of the params passed in by the user.
 */
export function validateParams(labelId: string): void {
  if (typeof labelId !== "string") {
    throw new InvalidFieldValueError("labelId", "must be a string.");
  }
  // "." and ".." survive encodeURIComponent and would be treated as path dot-segments
  if (labelId === "." || labelId === "..") {
    throw new InvalidFieldValueError(
      "labelId",
      "is not a valid label ID.",
      labelId
    );
  }
}
