import { EventEmitter } from "../isomorphic.node";
import { NormalizedConfig } from "../config";
import {
  AddressValidateParamsDTO,
  AddressValidateResultDTO,
  callJsonRpcMethod,
} from "../json-rpc";
import { formatAddress } from "./format-address";
import { Address, AddressValidationResult } from "./public-types";
import { validateInputAddress } from "./validate-input-address";
import { ValidationMessageType } from "../enums";
import { normalizeInputAddress } from "./normalize-input-address";

/**
 * Validates an address and returns the full validation results.
 */
export async function validateAddress(
  address: Address,
  config: NormalizedConfig,
  events: EventEmitter
): Promise<AddressValidationResult> {
  normalizeInputAddress(address);
  validateInputAddress(address);

  const params: AddressValidateParamsDTO = {
    address: {
      name: address.name,
      company: address.company,
      phone: address.phone,
      street: address.street as string[],
      cityLocality: address.cityLocality,
      stateProvince: address.stateProvince,
      postalCode: address.postalCode,
      countryCode: address.country,
      isResidential: address.isResidential,
    },
  };

  const result: AddressValidateResultDTO = await callJsonRpcMethod(
    "address.validate.v1",
    params,
    config,
    events
  );

  return createAddressValidationResult(result);
}

/**
 * Converts the JSON RPC 2.0 result to an AddressValidationResult object
 */
function createAddressValidationResult(
  result: AddressValidateResultDTO
): AddressValidationResult {
  const { isValid, normalizedAddress, messages } = result;

  return {
    isValid,
    normalizedAddress: (normalizedAddress || undefined) && {
      street: normalizedAddress.street,
      name: normalizedAddress.name || "",
      company: normalizedAddress.company || "",
      phone: normalizedAddress.phone || "",
      cityLocality: normalizedAddress.cityLocality,
      stateProvince: normalizedAddress.stateProvince,
      postalCode: normalizedAddress.postalCode,
      country: normalizedAddress.countryCode,

      // TODO: Replace this with a nullish coalescing operator
      // once Node 12 is no longer supported
      isResidential:
        normalizedAddress.isResidential === false
          ? false
          : normalizedAddress.isResidential || undefined,

      toString: formatAddress,
    },

    messages,

    get info() {
      return messages.filter((msg) => msg.type === ValidationMessageType.Info);
    },

    get warnings() {
      return messages.filter(
        (msg) => msg.type === ValidationMessageType.Warning
      );
    },

    get errors() {
      return messages.filter((msg) => msg.type === ValidationMessageType.Error);
    },
  };
}
