// import { EventEmitter } from "../isomorphic.node";
import { NormalizedConfig } from "../config";
import { get } from "../client";
// import { ValidateAddressParams, ValidateAddressResult } from "./types/public";
import { Response } from "./types/private";
// import { formatParams } from "./format-params";
// import { formatResult } from "./format-result";
// import { validateParams } from "./validate-params";

export * from "./types/public";

/**
 * This function returns a list of all your connected carrier accounts,
 * along with helpful information about each account, its options, the services it offers, etc.
 *
 * https://www.shipengine.com/docs/reference/list-carriers/
 */
export async function listCarrierAccounts(
  config: NormalizedConfig
): Promise<any> {
  // validateParams(params);

  // const formattedParams = formatParams(params);

  const response = await get<Response.ListCarriersResponseBody>(
    "/v1/carriers",
    config
  );

  console.log(JSON.stringify(response));
  return response;
}
