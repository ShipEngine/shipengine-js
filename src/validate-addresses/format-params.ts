import { Request } from "./types/private";
import { ValidateAddressParams } from "./types/public";

export function formatParams(
  params: ValidateAddressParams
): Request.ValidateAddressRequestBody {
  return [
    {
      name: params.name,
      company_name: params.company,
      address_line1: params.addressLineOne,
      address_line2: params.addressLineTwo,
      address_line3: params.addressLineThree,
      city_locality: params.cityLocality,
      state_province: params.stateProvince,
      postal_code: params.postalCode,
      country_code: params.country,
      address_residential_indicator: mapResidentialIndicator(
        params.isResidential
      ),
    },
  ];
}

function mapResidentialIndicator(
  indicator: boolean | undefined | null
): "unknown" | "yes" | "no" {
  switch (indicator) {
    case true:
      return "yes";
    case false:
      return "no";
    case undefined:
    case null:
      return "unknown";
    default:
      return "unknown";
  }
}
