import { CountryCode } from '../../../../../shared/models/country-code';

export interface AddressValidationResultDto {
  address?: Address;
  messages: Messages;
  valid: boolean;
}

export interface Address {
  cityLocality: string;
  companyName?: string;
  countryCode: CountryCode;
  name?: string;
  phone?: string;
  postalCode: string;
  residential: boolean | null;
  stateProvince: string;
  street: string[];
}

export interface Messages {
  errors: string[];
  info: string[];
  warnings: string[];
}
