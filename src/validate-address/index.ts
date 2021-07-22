// import { EventEmitter } from "../isomorphic.node";
import { NormalizedConfig } from "../config";
import { post } from "../client";
import { ValidateAddressParams, ValidateAddressResult } from "./types/public";
import { Request, Response } from "./types/private";
import { formatParams } from "./format-params";
import { formatResult } from "./format-result";
import { validateParams } from "./validate-params";

export * from "./types/public";

/**
 * Validates an address and returns the full validation results.
 *
 * https://www.shipengine.com/docs/addresses/validation/
 */
export async function validateAddress(
  params: ValidateAddressParams,
  config: NormalizedConfig
): Promise<ValidateAddressResult> {
  validateParams(params);

  const formattedParams = formatParams(params);

  const response = await post<
    Request.ValidateAddressRequestBody,
    Response.ValidateAddressResponseBody
  >("/v1/addresses/validate", formattedParams, config);

  return formatResult(response);
}
