import { ValidateAddressesTypes } from ".";
import { Response } from "./types/private";
import { ValidationMessageType } from "../enums";

export function formatResponse(
  response: Response.ValidateAddressResponseBody
): ValidateAddressesTypes.Response {
  return response.map((result) => formatAddressValidationResult(result));
}

function formatAddressValidationResult(
  result: Response.AddressValidationResult
): ValidateAddressesTypes.AddressValidationResult {
  const normalizedAddressResponse = result.matched_address;
  const originalAddressResponse = result.original_address;

  return {
    status: result.status,
    originalAddress: {
      name: originalAddressResponse.name,
      companyName: originalAddressResponse.company_name,
      addressLine1: originalAddressResponse.address_line1,
      addressLine2: originalAddressResponse.address_line2,
      addressLine3: originalAddressResponse.address_line3,
      cityLocality: originalAddressResponse.city_locality,
      stateProvince: originalAddressResponse.state_province,
      postalCode: originalAddressResponse.postal_code,
      countryCode: originalAddressResponse.country_code as Country,
      addressResidentialIndicator:
        originalAddressResponse.address_residential_indicator,
    },
    normalizedAddress:
      normalizedAddressResponse &&
      mapNormalizedAddress(normalizedAddressResponse),
    messages: result.messages.map((m) => ({
      detailCode: m.detail_code!,
      message: m.message,
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
): ValidateAddressesTypes.Address {
  return {
    name: normalizedAddressResponse.name,
    companyName: normalizedAddressResponse.company_name,
    addressLine1: normalizedAddressResponse.address_line1,
    addressLine2: normalizedAddressResponse.address_line2,
    addressLine3: normalizedAddressResponse.address_line3,
    cityLocality: normalizedAddressResponse.city_locality,
    stateProvince: normalizedAddressResponse.state_province,
    postalCode: normalizedAddressResponse.postal_code,
    countryCode: normalizedAddressResponse.country_code as Country,
    addressResidentialIndicator:
      normalizedAddressResponse.address_residential_indicator,
  };
}
