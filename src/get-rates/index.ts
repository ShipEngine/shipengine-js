import { NormalizedConfig } from "../config";
import { post } from "../client";
import * as GetRatesTypes from "./types/public";
import { Request, Response } from "./types/private";
import { formatParams } from "./format-params";
import { formatResponse } from "./format-response";
// import { validateParams } from "./validate-params";

export { GetRatesTypes };

/**
 * Retrieve various rates for a shipmnent.
 *
 * https://www.shipengine.com/docs/rates/
 */
export async function getRates(
  params: GetRatesTypes.Params,
  config: NormalizedConfig
): Promise<GetRatesTypes.Result> {
  // validateParams(params);

  const formattedParams = formatParams(params);

  const response = await post<
    Request.CalculateRatesRequestBody,
    Response.CalculateRatesResponseBody
  >("/v1/rates", formattedParams, config);

  return formatResponse(response);
}
