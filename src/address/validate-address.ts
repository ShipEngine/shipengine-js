import { NormalizedConfig } from "../config";
import { Country, ErrorCode, ErrorType } from "../enums";
import { InvalidFieldValueError, ShipEngineError } from "../errors";
import {
  AddressValidateParams,
  AddressValidateResult,
  callJsonRpcMethod,
} from "../json-rpc";
import * as assert from "../utils/assert";
import { isCountry } from "../utils/type-guards";
import { normalizeAddress } from "./normalized-address";
import { Address, AddressValidationResult } from "./public-types";

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

  return {
    isValid: result.valid,
    normalizedAddress: result.address && normalizeAddress(result.address),
    info: result.messages.info,
    warnings: result.messages.warnings,
    errors: result.messages.errors,
  };
}

/**
 * Performs client-side validation of the address object that's passed-in by
 * the user. If the address object is invalid, an error is thrown.
 */
function validateInputAddress(address: Address): void {
  assert.isPOJO("Address", address);
  validateAddressStreet(address.street);
  validateCountry(address.country);
  validateCityStatePostalCode(address);

  // Optional fields
  address.name && assert.isString("Name", address.name);
  address.company && assert.isString("Company name", address.company);
  address.phone && assert.isString("Phone number", address.phone);
  address.isResidential &&
    assert.isBoolean("Residential indicator", address.isResidential);
}

/**
 * Validates the `street` field of an input address
 */
function validateAddressStreet(street: string | string[]): void {
  if (typeof street === "string") {
    assert.isNonWhitespaceString("Street address", street);
  } else if (Array.isArray(street)) {
    assert.isArrayOfStrings("Street address", street);

    if (street.length === 0) {
      throw new ShipEngineError(
        ErrorType.Validation,
        ErrorCode.FieldValueRequired,
        "Invalid address. At least one address line is required."
      );
    }

    if (street.length > 3) {
      throw new ShipEngineError(
        ErrorType.Validation,
        ErrorCode.InvalidFieldValue,
        "Invalid address. No more than 3 street lines are allowed."
      );
    }
  } else {
    throw new InvalidFieldValueError(
      "Street address",
      "must be a string or array of strings.",
      street
    );
  }
}

/**
 * Validates the `country` field of an input address
 */
function validateCountry(country: Country): void {
  if (!country) {
    throw new ShipEngineError(
      ErrorType.Validation,
      ErrorCode.FieldValueRequired,
      "Invalid address. The country must be specified."
    );
  }

  if (!isCountry(country)) {
    throw new ShipEngineError(
      ErrorType.Validation,
      ErrorCode.InvalidFieldValue,
      `Invalid address. ${country} is not a valid country code.`
    );
  }
}

/**
 * Ensures that either the `postalCode` or the `cityLocality` and `stateProvince`
 * fields are populated.
 */
function validateCityStatePostalCode(address: Address): void {
  if (address.postalCode) {
    assert.isNonWhitespaceString("Postal code", address.postalCode);
  } else if (address.cityLocality && address.stateProvince) {
    assert.isNonWhitespaceString("City/locality", address.cityLocality);
    assert.isNonWhitespaceString("State/province", address.stateProvince);
  } else {
    throw new ShipEngineError(
      ErrorType.Validation,
      ErrorCode.FieldValueRequired,
      `Invalid address. Either the postal code or the city/locality and state/province must be specified.`
    );
  }
}
