// import { EventEmitter } from "../isomorphic.node";
import { NormalizedConfig } from "../config";
import { get } from "../client";
import * as ListCarriersTypes from "./types/public";
import { Response } from "./types/private";
import { formatResponse } from "./format-response";

export { ListCarriersTypes };

/**
 * This function returns a list of all your connected carrier accounts,
 * along with helpful information about each account, its options, the services it offers, etc.
 *
 * https://www.shipengine.com/docs/reference/list-carriers/
 */
export async function listCarriers(
  config: NormalizedConfig
): Promise<ListCarriersTypes.Result> {
  const response = await get<Response.ListCarriersResponseBody>(
    "/v1/carriers",
    config
  );

  return formatResponse(response);
}
