import { ValidateAddressResult, Address } from "./types/public";
import { Response } from "./types/private";
import { isCountry } from "../utils/type-guards";
import { ShipEngineError } from "../errors";
import { ErrorCode, ErrorType, ValidationMessageType } from "../enums";

export function formatResult(
  response: Response.ValidateAddressResponseBody
): ValidateAddressResult {
  const validateAddressResponse = response[0];
  const normalizedAddressResponse = validateAddressResponse.matched_address;
  const originalAddressResponse = validateAddressResponse.original_address;

  return {
    status: validateAddressResponse.status,
    originalAddress: {
      name: originalAddressResponse.name || "",
      company: originalAddressResponse.company_name || "",
      addressLineOne: originalAddressResponse.address_line1 || "",
      addressLineTwo: originalAddressResponse.address_line2 || "",
      addressLineThree: originalAddressResponse.address_line3 || "",
      cityLocality: originalAddressResponse.city_locality || "",
      stateProvince: originalAddressResponse.state_province || "",
      postalCode: originalAddressResponse.postal_code || "",
      country: originalAddressResponse.country_code
        ? mapCountry(originalAddressResponse.country_code)
        : "",
      isResidential: mapResidentialIndicator(
        originalAddressResponse.address_residential_indicator
      ),
    },
    normalizedAddress:
      normalizedAddressResponse &&
      mapNormalizedAddress(normalizedAddressResponse),
    messages: validateAddressResponse.messages.map((m) => ({
      detailCode: m.detail_code! || "",
      message: m.message || "",
      type: mapMessageType(m.type!),
    })),
  };
}

function mapMessageType(
  type: Response.AddressValidationMessageType
): ValidationMessageType {
  switch (type) {
    case "error":
      return ValidationMessageType.Error;
    case "info":
      return ValidationMessageType.Info;
    case "warning":
      return ValidationMessageType.Warning;
  }
}

function mapNormalizedAddress(
  normalizedAddressResponse: Response.PartialAddress
): Address {
  return {
    name: normalizedAddressResponse.name || "",
    company: normalizedAddressResponse.company_name || "",
    addressLineOne: normalizedAddressResponse.address_line1 || "",
    addressLineTwo: normalizedAddressResponse.address_line2 || "",
    addressLineThree: normalizedAddressResponse.address_line3 || "",
    cityLocality: normalizedAddressResponse.city_locality || "",
    stateProvince: normalizedAddressResponse.state_province || "",
    postalCode: normalizedAddressResponse.postal_code || "",
    country: normalizedAddressResponse.country_code
      ? mapCountry(normalizedAddressResponse.country_code)
      : "",
    isResidential: mapResidentialIndicator(
      normalizedAddressResponse &&
        normalizedAddressResponse.address_residential_indicator
    ),
  };
}

function mapCountry(country: unknown) {
  if (isCountry(country)) {
    return country;
  } else {
    throw new ShipEngineError(
      ErrorType.Validation,
      ErrorCode.InvalidFieldValue,
      `Invalid address. ${country} is not a valid country code.`
    );
  }
}

function mapResidentialIndicator(
  indicator: "unknown" | "yes" | "no" | undefined | null
): boolean | undefined {
  switch (indicator) {
    case "yes":
      return true;
    case undefined:
    case null:
    case "unknown":
    case "no":
      return false;
  }
}
