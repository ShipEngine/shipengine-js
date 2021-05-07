import { EventEmitter } from "../isomorphic.node";
import { NormalizedConfig } from "../config";
import { callJsonRpcMethod } from "../json-rpc";

import { ListCarriersDTO } from "../json-rpc";
import { ListCarriersResult } from "./public-types";
import { Carriers } from "./carriers";

const method = "carriers";

/**
 * Retrieves all carrier accounts and returns them in an array.
 */
export async function listCarrierAccounts(
  config: NormalizedConfig,
  events: EventEmitter
): Promise<ListCarriersResult> {
  const result: ListCarriersDTO = await callJsonRpcMethod(
    method,
    {},
    config,
    events
  );

  return createGetCarriersResult(result);
}

/**
 * Converts the JSON RPC 2.0 result to an AddressValidationResult object
 */
function createGetCarriersResult(result: ListCarriersDTO): ListCarriersResult {
  return {} as ListCarriersResult;
}
