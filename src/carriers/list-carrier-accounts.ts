import { EventEmitter } from "../isomorphic.node";
import { NormalizedConfig } from "../config";
import { callJsonRpcMethod } from "../json-rpc";

import { GetCarriersRPCResult, GetCarriersResult } from "./public-types";

const method = "carriers";

/**
 * Retrieves all carrier accounts and returns them in an array.
 */
export async function listCarrierAccounts(
  config: NormalizedConfig,
  events: EventEmitter
): Promise<GetCarriersRPCResult> {
  const result: GetCarriersRPCResult = await callJsonRpcMethod(
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
function createGetCarriersResult(
  result: GetCarriersRPCResult
): GetCarriersResult {
  return {} as GetCarriersResult;
}
