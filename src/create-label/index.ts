// import { EventEmitter } from "../isomorphic.node";
import { NormalizedConfig } from "../config";
import { post } from "../client";
import * as CreateLabelRequestTypes from "./types/public-request";
import * as CreateLabelResponseTypes from "./types/public-response";
import { Request, Response } from "./types/private";
import { formatParams } from "./format-params";
import { formatResponse } from "./format-response";

export { CreateLabelResponseTypes, CreateLabelRequestTypes };

/**
 * Purchase and print a label for shipment
 *
 * https://shipengine.github.io/shipengine-openapi/#operation/create_label
 */
export async function createLabel(
  params: CreateLabelRequestTypes.Params,
  config: NormalizedConfig
): Promise<CreateLabelResponseTypes.Response> {
  const formattedParams = formatParams(params);

  const response = await post<
    Request.CreateLabelRequestBody,
    Response.CreateLabelResponseBody
  >("/v1/labels", formattedParams, config);

  return formatResponse(response);
}
