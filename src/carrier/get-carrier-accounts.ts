import { EventEmitter } from "../isomorphic.node";
import { NormalizedConfig } from "../config";
import { callJsonRpcMethod, CarriersDTOResult } from "../json-rpc";

import { CarriersDTO } from "../json-rpc";
import { CarrierAccount } from "./public-types";
import { carrierNames } from "./carrier-names";
import { CarrierCode, ErrorCode, ErrorType } from "../enums";
import { InvalidFieldValueError, ShipEngineError } from "../errors";

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

  const params = {
    carrierCode,
  };

  const result: CarriersDTOResult = await callJsonRpcMethod(
    method,
    params,
    config,
    events
  );

  return formatGetCarriersResults(result);
}

/**
 *
 */
function formatGetCarriersResults(result: CarriersDTOResult): CarrierAccount[] {
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

function isCarrierCode(code: unknown): code is CarrierCode {
  return Object.values(CarrierCode).includes(code as CarrierCode);
}
