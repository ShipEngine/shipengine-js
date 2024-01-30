import { get } from "../client";
import * as TrackUsingCarrierCodeAndTrackingNumberTypes from "./types/public";
import { formatResponse } from "./format-response";
import { validateParams } from "./validate-params";
export { TrackUsingCarrierCodeAndTrackingNumberTypes };
/**
 * Returns the tracking information of a package identified by its tracking number and carrier code.
 *
 * @see https://www.shipengine.com/docs/tracking
 */
export async function trackUsingCarrierCodeAndTrackingNumber(params, config) {
    validateParams(params);
    const response = await get(`/v1/tracking?carrier_code=${params.carrierCode}&tracking_number=${params.trackingNumber}`, config);
    return formatResponse(response);
}
//# sourceMappingURL=index.js.map