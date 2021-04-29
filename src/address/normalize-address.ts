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
): Promise<NormalizedAddress> {
  // Calls the validateAddress method and uses its output
  const result: AddressValidationResult = await validateAddress(
    address,
    config,
    events
  );

  if (!resultIsSuccessful(result)) {
    throw new ShipEngineError(
      ErrorType.BusinessRules,
      ErrorCode.InvalidAddress,
      "Invalid address." + "\n" + result.errors.join(`\n`)
    );
  }

  return result.normalizedAddress;
}

// Type Guard. If this function returns true, we can know that the value passed in is of type AddressValidationSuccess
function resultIsSuccessful(
  result: AddressValidationResult
): result is AddressValidationResultSuccess {
  return (
    result.isValid &&
    result.normalizedAddress !== undefined &&
    result.errors.length === 0
  );
}

// Type created for Type Guard above
interface AddressValidationResultSuccess extends AddressValidationResult {
  isValid: true;
  normalizedAddress: NormalizedAddress;
}
