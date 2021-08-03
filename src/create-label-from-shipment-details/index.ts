// import { EventEmitter } from "../isomorphic.node";
import { NormalizedConfig } from "../config";
import { post } from "../client";
import * as CreateLabelFromShipmentDetailsTypes from "./types/public";
import { Request, Response } from "./types/private";
import { formatParams } from "./format-params";
import { formatResponse } from "./format-response";

export { CreateLabelFromShipmentDetailsTypes };

/**
 * Purchase and print a label for shipment
 *
 * https://shipengine.github.io/shipengine-openapi/#operation/create_label
 */
export async function createLabelFromShipmentDetails(
  params: CreateLabelFromShipmentDetailsTypes.Params,
  config: NormalizedConfig
): Promise<CreateLabelFromShipmentDetailsTypes.Result> {
  const formattedParams = formatParams(params);

  const response = await post<
    Request.CreateLabelRequestBody,
    Response.CreateLabelResponseBody
  >("/v1/labels", formattedParams, config);

  return formatResponse(response);
}
