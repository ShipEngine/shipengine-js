import { NormalizedConfig } from "../config";
import {
  AddressValidateParams,
  AddressValidateResult,
  callJsonRpcMethod
} from "../json-rpc";
import { formatAddress } from "./format-address";
import { Address, AddressValidationResult } from "./public-types";
import { validateInputAddress } from "./validate-input-address";

/**
 * Validates an address and returns the full validation results.
 */
export async function validateAddress(
  address: Address,
  config: NormalizedConfig
): Promise<AddressValidationResult> {
  validateInputAddress(address);

  // Normalizing street to an array
  const street = Array.isArray(address.street)
    ? address.street
    : [address.street];

  const params: AddressValidateParams = {
    address: {
      name: address.name,
      company_name: address.company,
      phone: address.phone,
      street,
      city_locality: address.cityLocality,
      state_province: address.stateProvince,
      postal_code: address.postalCode,
      country_code: address.country,
      residential: address.isResidential,
    },
  };

  const result: AddressValidateResult = await callJsonRpcMethod(
    "address/validate",
    params,
    config
  );

  return createAddressValidationResult(result);
}

/**
 * Converts the JSON RPC 2.0 result to an AddressValidationResult object
 */
function createAddressValidationResult(
  result: AddressValidateResult
): AddressValidationResult {
  return {
    isValid: result.valid,
    normalizedAddress: result.address && {
      street: result.address.street,
      name: result.address.name || "",
      company: result.address.company_name || "",
      phone: result.address.phone || "",
      cityLocality: result.address.city_locality,
      stateProvince: result.address.state_province,
      postalCode: result.address.postal_code,
      country: result.address.country_code,

      // TODO: Replace this with a nullish coalescing operator
      // once Node 12 is no longer supported
      isResidential:
        result.address.residential === false
          ? false
          : result.address.residential || undefined,

      toString: formatAddress,
    },
    info: result.messages.info,
    warnings: result.messages.warnings,
    errors: result.messages.errors,
  };
}
