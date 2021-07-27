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
      name: originalAddressResponse.name!, // Error in generated types
      phone: originalAddressResponse.phone!, // Error in generated types
      companyName: originalAddressResponse.company_name || null,
      addressLine1: originalAddressResponse.address_line1!, // Error in generated types
      addressLine2: originalAddressResponse.address_line2 || null,
      addressLine3: originalAddressResponse.address_line3 || null,
      cityLocality: originalAddressResponse.city_locality!, // Error in generated types
      stateProvince: originalAddressResponse.state_province!, // Error in generated types
      postalCode: originalAddressResponse.postal_code!, // Error in generated types
      countryCode:
        originalAddressResponse.country_code as ValidateAddressesTypes.Result[0]["originalAddress"]["countryCode"],
      addressResidentialIndicator:
        originalAddressResponse.address_residential_indicator!, // Error in generated types
    },
    normalizedAddress: normalizedAddressResponse
      ? mapNormalizedAddress(normalizedAddressResponse)
      : null,
    messages: result.messages.map((m) => ({
      detailCode: m.detail_code,
      message: m.message,
      type: m.type,
    })),
  };
}

function mapNormalizedAddress(
  normalizedAddressResponse: Response.PartialAddress
): NonNullable<ValidateAddressesTypes.Result[0]["normalizedAddress"]> {
  return {
    name: normalizedAddressResponse.name!, // Error in generated types
    phone: normalizedAddressResponse.phone!, // Error in generated types
    companyName: normalizedAddressResponse.company_name || null,
    addressLine1: normalizedAddressResponse.address_line1!, // Error in generated types
    addressLine2: normalizedAddressResponse.address_line2 || null,
    addressLine3: normalizedAddressResponse.address_line3 || null,
    cityLocality: normalizedAddressResponse.city_locality!, // Error in generated types
    stateProvince: normalizedAddressResponse.state_province!, // Error in generated types
    postalCode: normalizedAddressResponse.postal_code!, // Error in generated types
    countryCode: normalizedAddressResponse.country_code as NonNullable<
      ValidateAddressesTypes.Result[0]["normalizedAddress"]
    >["countryCode"],
    addressResidentialIndicator:
      normalizedAddressResponse.address_residential_indicator!, // Error in generated types
  };
}
