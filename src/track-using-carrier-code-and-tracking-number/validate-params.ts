import { InvalidFieldValueError } from "../errors";
import { TrackUsingCarrierCodeAndTrackingNumberTypes } from ".";

/**
 * Performs client-side validation of the params passed in by the user.
 */
export function validateParams(
  params: TrackUsingCarrierCodeAndTrackingNumberTypes.Params
): void {
  if (typeof params.trackingNumber !== "string") {
    throw new InvalidFieldValueError("Params", "must be a string.");
  }

  if (typeof params.carrierCode !== "string") {
    throw new InvalidFieldValueError("Params", "must be a string.");
  }
}
