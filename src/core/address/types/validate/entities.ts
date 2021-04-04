import { CountryCode } from "../../../../shared/models/country-code";
import { Messages } from "../../../../shared/models/messsages";
import { IResult } from "../../../../shared/models/result";

/**
 * this will never be constructed
 */
export interface ValidateAddressParams {
  street: string[];
  countryCode: CountryCode;
  cityLocality?: string;
  postalCode?: string;
  stateProvince?: string;
}

export interface Address {
  street: string[];
  countryCode: CountryCode;
  cityLocality?: string;
  postalCode?: string;
  stateProvince?: string;
  isResidential?: boolean;
}

export interface ValidateAddressResult extends IResult {
  isValid: boolean;
  messages: Messages;
  normalized?: Address;
  original?: Address;
}

export type ValidateAddressConvenienceResult = ValidateAddressResult;
