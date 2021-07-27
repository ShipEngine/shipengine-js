// import { EventEmitter } from "../isomorphic.node";
import { NormalizedConfig } from "../config";
import { post } from "../client";
import * as ValidateAddressesTypes from "./types/public";
import { Request, Response } from "./types/private";
import { formatParams } from "./format-params";
import { formatResponse } from "./format-response";
import { validateParams } from "./validate-params";

export { ValidateAddressesTypes };

/**
 * Validates an address and returns the full validation results.
 *
 * https://www.shipengine.com/docs/addresses/validation/
 */
export async function validateAddresses(
  params: ValidateAddressesTypes.Params,
  config: NormalizedConfig
): Promise<ValidateAddressesTypes.Result> {
  validateParams(params);

  const formattedParams = formatParams(params);

  const response = await post<
    Request.ValidateAddressRequestBody,
    Response.ValidateAddressResponseBody
  >("/v1/addresses/validate", formattedParams, config);

  return formatResponse(response);
}
