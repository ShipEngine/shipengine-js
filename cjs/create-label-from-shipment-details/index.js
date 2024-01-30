"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLabelFromShipmentDetails = exports.CreateLabelFromShipmentDetailsTypes = void 0;
const client_1 = require("../client");
const CreateLabelFromShipmentDetailsTypes = require("./types/public");
exports.CreateLabelFromShipmentDetailsTypes = CreateLabelFromShipmentDetailsTypes;
const format_params_1 = require("./format-params");
const format_response_1 = require("./format-response");
/**
 * Purchase and print a label for shipment
 *
 * https://shipengine.github.io/shipengine-openapi/#operation/create_label
 */
async function createLabelFromShipmentDetails(params, config) {
    const formattedParams = format_params_1.formatParams(params);
    const response = await client_1.post("/v1/labels", formattedParams, config);
    return format_response_1.formatResponse(response);
}
exports.createLabelFromShipmentDetails = createLabelFromShipmentDetails;
//# sourceMappingURL=index.js.map