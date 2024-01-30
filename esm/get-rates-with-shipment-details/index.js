import { post } from "../client";
import * as GetRatesWithShipmentDetailsTypes from "./types/public";
import { formatParams } from "./format-params";
import { formatResponse } from "./format-response";
// import { validateParams } from "./validate-params";
export { GetRatesWithShipmentDetailsTypes };
/**
 * Retrieve various rates for a shipmnent.
 *
 * https://www.shipengine.com/docs/rates/
 */
export async function getRatesWithShipmentDetails(params, config) {
    // validateParams(params);
    const formattedParams = formatParams(params);
    const response = await post("/v1/rates", formattedParams, config);
    return formatResponse(response);
}
//# sourceMappingURL=index.js.map