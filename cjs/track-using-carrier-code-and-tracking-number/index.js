"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackUsingCarrierCodeAndTrackingNumber = exports.TrackUsingCarrierCodeAndTrackingNumberTypes = void 0;
const client_1 = require("../client");
const TrackUsingCarrierCodeAndTrackingNumberTypes = require("./types/public");
exports.TrackUsingCarrierCodeAndTrackingNumberTypes = TrackUsingCarrierCodeAndTrackingNumberTypes;
const format_response_1 = require("./format-response");
const validate_params_1 = require("./validate-params");
/**
 * Returns the tracking information of a package identified by its tracking number and carrier code.
 *
 * @see https://www.shipengine.com/docs/tracking
 */
async function trackUsingCarrierCodeAndTrackingNumber(params, config) {
    validate_params_1.validateParams(params);
    const response = await client_1.get(`/v1/tracking?carrier_code=${params.carrierCode}&tracking_number=${params.trackingNumber}`, config);
    return format_response_1.formatResponse(response);
}
exports.trackUsingCarrierCodeAndTrackingNumber = trackUsingCarrierCodeAndTrackingNumber;
//# sourceMappingURL=index.js.map