import { EventEmitter } from "../isomorphic.node";
import { NormalizedConfig } from "../config";
import { callJsonRpcMethod, CarriersDTOResult } from "../json-rpc";
import { CarrierAccount } from "./public-types";
import { carrierNames } from "./carrier-names";
import { CarrierCode, ErrorCode, ErrorType } from "../enums";
import { ShipEngineError } from "../errors";
import { getAccountCache, setAccountCache } from "./account-cache";

const method = "carrier.listAccounts.v1";

/**
 * Retrieves all carrier accounts and returns them in an array.
 */
export async function getCarrierAccounts(
  config: NormalizedConfig,
  events: EventEmitter,
  carrierCode?: string
): Promise<CarrierAccount[]> {
  if (carrierCode && !isCarrierCode(carrierCode)) {
    throw new ShipEngineError(
      ErrorType.Validation,
      ErrorCode.InvalidFieldValue,
      `Invalid input. ${carrierCode} is not a valid carrier code.`
    );
  }

  const params = { carrierCode };

  let result: CarriersDTOResult;

  // Check the cache before calling the RPC API.
  const carrierAccountsCache: CarrierAccount[] = getAccountCache();

  // If cache is empty, fetch accounts
  if (carrierAccountsCache.length === 0) {
    result = await callJsonRpcMethod(method, params, config, events);
    const formattedResults = formatGetCarriersResult(result);
    // Reset the account cache
    setAccountCache(formattedResults);
  }
  return carrierAccountsCache;
}

/**
 * Formats the results from the RPC call to match the SDK type..
 */
function formatGetCarriersResult(result: CarriersDTOResult): CarrierAccount[] {
  const carriers: CarrierAccount[] = [];

  const { carrierAccounts } = result;

  for (const c of carrierAccounts) {
    const item = {
      id: c.accountID,
      carrier: {
        name: carrierNames[c.carrierCode] || "",
        code: c.carrierCode,
      },
      accountNumber: c.accountNumber,
      name: c.name,
    };
    carriers.push(item);
  }

  return carriers;
}

/**
 * Type Guard to ensure we got a valid carrierCode.
 */
function isCarrierCode(code: unknown): code is CarrierCode {
  return Object.values(CarrierCode).includes(code as CarrierCode);
}
