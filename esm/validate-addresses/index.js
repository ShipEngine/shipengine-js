import { post } from "../client";
import * as ValidateAddressesTypes from "./types/public";
import { formatParams } from "./format-params";
import { formatResponse } from "./format-response";
import { validateParams } from "./validate-params";
export { ValidateAddressesTypes };
/**
 * Validates an address and returns the full validation results.
 *
 * https://www.shipengine.com/docs/addresses/validation/
 */
export async function validateAddresses(params, config) {
    validateParams(params);
    const formattedParams = formatParams(params);
    const response = await post("/v1/addresses/validate", formattedParams, config);
    return formatResponse(response);
}
//# sourceMappingURL=index.js.map