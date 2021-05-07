import { Country, ErrorCode, ErrorType } from "../enums";
import { InvalidFieldValueError, ShipEngineError } from "../errors";
import * as assert from "../utils/assert";
import { isCountry } from "../utils/type-guards";
import { Address } from "./public-types";

/**
 * Performs client-side validation of the address object that's passed-in by
 * the user. If the address object is invalid, an error is thrown.
 */
export function validateInputAddress(address: Address): void {
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
