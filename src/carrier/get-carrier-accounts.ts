import { EventEmitter } from "../isomorphic.node";
import { NormalizedConfig } from "../config";
import { callJsonRpcMethod } from "../json-rpc";

import { ListCarriersDTO } from "../json-rpc";
import { CarrierAccount } from "./public-types";
import { carrierNames } from "./carrier-names";
import { CarrierCode } from "./../enums/carrier-code";


const method = "carrier.listAccounts.v1";

/**
 * Retrieves all carrier accounts and returns them in an array.
 */
export async function listCarrierAccounts(
  config: NormalizedConfig,
  events: EventEmitter,
  carrierCode?: string
): Promise<CarrierAccount[]> {
  let params = {};

  if (carrierCode) {
    params = {
      carrierCode,
    };
  }
  const result: ListCarriersDTO = await callJsonRpcMethod(
    method,
    params,
    config,
    events
  );

  return formatGetCarriersResults(result);
}

/**
 * Converts the JSON RPC 2.0 result to an AddressValidationResult object
 */
function formatGetCarriersResults(result: ListCarriersDTO): CarrierAccount[] {
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
    console.log(item);
    carriers.push(item);
  }

  return carriers;
}
