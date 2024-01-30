import { post } from "../client";
import * as CreateLabelFromShipmentDetailsTypes from "./types/public";
import { formatParams } from "./format-params";
import { formatResponse } from "./format-response";
export { CreateLabelFromShipmentDetailsTypes };
/**
 * Purchase and print a label for shipment
 *
 * https://shipengine.github.io/shipengine-openapi/#operation/create_label
 */
export async function createLabelFromShipmentDetails(params, config) {
    const formattedParams = formatParams(params);
    const response = await post("/v1/labels", formattedParams, config);
    return formatResponse(response);
}
//# sourceMappingURL=index.js.map