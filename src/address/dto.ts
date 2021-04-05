import { Country } from "../types/country";

/**
 * The params that are passed to the ShipEngine address validation API.
 */
export interface JsonRpcParams {
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
export interface JsonRpcResult {
  valid: boolean;
  address?: JsonRpcResultAddress;
  messages: {
    info: string[];
    warnings: string[];
    errors: string[];
  };
}

/**
 * The normalized address that is returned from the ShipEngine address validation API.
 */
export interface JsonRpcResultAddress {
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
