import { CountryCode } from "../../../../../shared/models/country-code";

// generated from https://app.quicktype.io/ -- do not edit by hand
export interface AddressValidationParamsDto {
  address: Address;
}

export interface Address {
  city_locality?: string;
  company_name?: string;
  country_code: CountryCode;
  name?: string;
  phone?: string;
  postal_code?: string;
  residential?: boolean | null;
  state_province?: string;
  street: string[];
}
