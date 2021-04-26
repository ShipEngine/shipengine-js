import { EventEmitter } from "../isomorphic.node";
import { NormalizedConfig } from "../config";
import {
  AddressValidateParams,
  AddressValidateResult,
  callJsonRpcMethod,
} from "../json-rpc";
import { formatAddress } from "./format-address";
import {
  Address,
  AddressValidationResult,
  NormalizedAddress,
} from "./public-types";
import { validateAddress } from "./validate-address";
import { validateInputAddress } from "./validate-input-address";
import { ShipEngineError } from "../errors";
import { ErrorCode, ErrorType } from "../enums";

/**
 * Normalizes an address and returns it.
 */
export async function normalizeAddress(
  address: Address,
  config: NormalizedConfig,
  events: EventEmitter
  // @ts-expect-error TypeScript is confused by the return in the for loop
): Promise<NormalizedAddress | ShipEngineError> {
  let error: string;

  try {
    const result: AddressValidationResult = await validateAddress(
      address,
      config,
      events
    );
    if (result.normalizedAddress) {
      if (!doesNormalizedAddressHaveErrors(result)) {
        return result.normalizedAddress;
      } else {
        return new ShipEngineError(
          ErrorType.BusinessRules,
          ErrorCode.InvalidAddress,
          `Invalid address. ${result.errors}`
        );
      }
    }
  } catch (e) {
    return new ShipEngineError(
      ErrorType.BusinessRules,
      ErrorCode.InvalidAddress,
      `Invalid address. ${e.message}`
    );
  }
}

function doesNormalizedAddressHaveErrors(
  result: AddressValidationResult
  // @ts-expect-error TypeScript is confused by the return in the for loop
): boolean {
  !(
    result.isValid &&
    result.normalizedAddress !== undefined &&
    result.errors.length === 0
  );
}
