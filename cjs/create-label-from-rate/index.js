"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLabelFromRate = exports.CreateLabelFromRateTypes = void 0;
const client_1 = require("../client");
const CreateLabelFromRateTypes = require("./types/public");
exports.CreateLabelFromRateTypes = CreateLabelFromRateTypes;
const format_params_1 = require("./format-params");
const format_response_1 = require("./format-response");
const validate_params_1 = require("./validate-params");
/**
 * Purchase and print a label for shipment
 *
 * https://shipengine.github.io/shipengine-openapi/#operation/create_label_from_rate
 */
async function createLabelFromRate(params, config) {
    validate_params_1.validateParams(params);
    const formattedParams = format_params_1.formatParams(params);
    const response = await client_1.post(`/v1/labels/rates/${params.rateId}`, formattedParams, config);
    return format_response_1.formatResponse(response);
}
exports.createLabelFromRate = createLabelFromRate;
//# sourceMappingURL=index.js.map