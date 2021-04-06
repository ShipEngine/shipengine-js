import { Country } from "../enums";

/**
 * The params that are passed to the ShipEngine address validation API.
 */
export interface AddressValidateParams {
  address: {
    name?: string;
    company_name?: string;
    phone?: string;
    street: string[];
    city_locality?: string;
    state_province?: string;
    postal_code?: string;
    country_code: Country;
    residential?: boolean | null;
  };
}

/**
 * The result that comes back from the ShipEngine address validation API.
 */
export interface AddressValidateResult {
  valid: boolean;
  address?: NormalizedAddressDTO;
  messages: {
    info: string[];
    warnings: string[];
    errors: string[];
  };
}

/**
 * The normalized address that is returned from the ShipEngine address validation API.
 */
export interface NormalizedAddressDTO {
  name?: string;
  company_name?: string;
  phone?: string;
  street: string[];
  city_locality: string;
  state_province: string;
  postal_code: string;
  country_code: Country;
  residential: boolean | null;
}
