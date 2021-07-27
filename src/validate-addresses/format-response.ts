import { ValidateAddressesTypes } from ".";
import { Response } from "./types/private";

export function formatResponse(
  response: Response.ValidateAddressResponseBody
): ValidateAddressesTypes.Result {
  return response.map((result) => formatAddressValidationResult(result));
}

function formatAddressValidationResult(
  result: Response.AddressValidationResult
): ValidateAddressesTypes.Result[0] {
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
      countryCode:
        originalAddressResponse.country_code as ValidateAddressesTypes.Result[0]["originalAddress"]["countryCode"],
      addressResidentialIndicator:
        originalAddressResponse.address_residential_indicator,
    },
    normalizedAddress:
      normalizedAddressResponse &&
      mapNormalizedAddress(normalizedAddressResponse),
    messages: result.messages.map((m) => ({
      detailCode: m.detail_code,
      message: m.message,
      type: m.type,
    })),
  };
}

function mapNormalizedAddress(
  normalizedAddressResponse: Response.PartialAddress
): ValidateAddressesTypes.Result[0]["normalizedAddress"] {
  return {
    name: normalizedAddressResponse.name,
    companyName: normalizedAddressResponse.company_name,
    addressLine1: normalizedAddressResponse.address_line1,
    addressLine2: normalizedAddressResponse.address_line2,
    addressLine3: normalizedAddressResponse.address_line3,
    cityLocality: normalizedAddressResponse.city_locality,
    stateProvince: normalizedAddressResponse.state_province,
    postalCode: normalizedAddressResponse.postal_code,
    countryCode: normalizedAddressResponse.country_code as NonNullable<
      ValidateAddressesTypes.Result[0]["normalizedAddress"]
    >["countryCode"],
    addressResidentialIndicator:
      normalizedAddressResponse.address_residential_indicator,
  };
}
