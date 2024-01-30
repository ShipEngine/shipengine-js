"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRatesWithShipmentDetails = exports.GetRatesWithShipmentDetailsTypes = void 0;
const client_1 = require("../client");
const GetRatesWithShipmentDetailsTypes = require("./types/public");
exports.GetRatesWithShipmentDetailsTypes = GetRatesWithShipmentDetailsTypes;
const format_params_1 = require("./format-params");
const format_response_1 = require("./format-response");
/**
 * Retrieve various rates for a shipmnent.
 *
 * https://www.shipengine.com/docs/rates/
 */
async function getRatesWithShipmentDetails(params, config) {
    // validateParams(params);
    const formattedParams = format_params_1.formatParams(params);
    const response = await client_1.post("/v1/rates", formattedParams, config);
    return format_response_1.formatResponse(response);
}
exports.getRatesWithShipmentDetails = getRatesWithShipmentDetails;
//# sourceMappingURL=index.js.map