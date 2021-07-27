// import { EventEmitter } from "../isomorphic.node";
import { NormalizedConfig } from "../config";
import { post } from "../client";
import * as CreateLabelTypes from "./types/public";
import { Request, Response } from "./types/private";
import { formatParams } from "./format-params";
import { formatResponse } from "./format-response";

export { CreateLabelTypes };

/**
 * Purchase and print a label for shipment
 *
 * https://shipengine.github.io/shipengine-openapi/#operation/create_label
 */
export async function createLabel(
  params: CreateLabelTypes.Params,
  config: NormalizedConfig
): Promise<CreateLabelTypes.Response> {
  const formattedParams = formatParams(params);

  const response = await post<
    Request.CreateLabelRequestBody,
    Response.CreateLabelResponseBody
  >("/v1/labels", formattedParams, config);

  return formatResponse(response);
}
