import { post } from "../client";
import * as CreateLabelFromRateTypes from "./types/public";
import { formatParams } from "./format-params";
import { formatResponse } from "./format-response";
import { validateParams } from "./validate-params";
export { CreateLabelFromRateTypes };
/**
 * Purchase and print a label for shipment
 *
 * https://shipengine.github.io/shipengine-openapi/#operation/create_label_from_rate
 */
export async function createLabelFromRate(params, config) {
    validateParams(params);
    const formattedParams = formatParams(params);
    const response = await post(`/v1/labels/rates/${params.rateId}`, formattedParams, config);
    return formatResponse(response);
}
//# sourceMappingURL=index.js.map