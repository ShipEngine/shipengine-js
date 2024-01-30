"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAddresses = exports.ValidateAddressesTypes = void 0;
const client_1 = require("../client");
const ValidateAddressesTypes = require("./types/public");
exports.ValidateAddressesTypes = ValidateAddressesTypes;
const format_params_1 = require("./format-params");
const format_response_1 = require("./format-response");
const validate_params_1 = require("./validate-params");
/**
 * Validates an address and returns the full validation results.
 *
 * https://www.shipengine.com/docs/addresses/validation/
 */
async function validateAddresses(params, config) {
    validate_params_1.validateParams(params);
    const formattedParams = format_params_1.formatParams(params);
    const response = await client_1.post("/v1/addresses/validate", formattedParams, config);
    return format_response_1.formatResponse(response);
}
exports.validateAddresses = validateAddresses;
//# sourceMappingURL=index.js.map