import { EventEmitter } from "../isomorphic.node";
import { NormalizedConfig } from "../config";

import {
  Address,
  AddressValidationResult,
  NormalizedAddress,
} from "./public-types";
import { validateAddress } from "./validate-address";
import { ShipEngineError } from "../errors";
import { ErrorCode, ErrorType } from "../enums";

/**
 * Normalizes an address and returns it if the address is valid. Otherwise, it returns a ShipEngineError.
 */
export async function normalizeAddress(
  address: Address,
  config: NormalizedConfig,
  events: EventEmitter
  // @ts-expect-error TypeScript is confused by the return in the for loop
): Promise<NormalizedAddress> {
  const result: AddressValidationResult = await validateAddress(
    address,
    config,
    events
  );

  if (result.normalizedAddress) {
    if (!doesNormalizedAddressHaveErrors(result)) {
      return result.normalizedAddress;
    } else {
      throw new ShipEngineError(
        ErrorType.BusinessRules,
        ErrorCode.InvalidAddress,
        `Invalid address. ${result.errors}`
      );
    }
  }
}

function doesNormalizedAddressHaveErrors(
  result: AddressValidationResult
  // @ts-expect-error TypeScript is confused by the return in the for loop
): boolean {
  Boolean(
    !(
      result.isValid &&
      result.normalizedAddress !== undefined &&
      result.errors.length === 0
    )
  );
}
