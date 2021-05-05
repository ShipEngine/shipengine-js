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
  // Calls the validateAddress method since it uses the same RPC API call
  const result: AddressValidationResult = await validateAddress(
    address,
    config,
    events
  );

  if (!resultIsSuccessful(result)) {
    throw new ShipEngineError(
      ErrorType.BusinessRules,
      ErrorCode.InvalidAddress,
      "Invalid address. " +
        (result.errors.length === 1
          ? result.errors[0].message
          : "\n" + result.errors.map((msg) => msg.message).join(`\n`))
    );
  }

  return result.normalizedAddress;
}

/**
 * Type Guard ensures we have an AddressValidationResultSuccess
 */
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
