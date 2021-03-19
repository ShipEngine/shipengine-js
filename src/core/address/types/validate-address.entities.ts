import { Messages } from '../../../shared/models/messsages';
import { IResult } from '../../../shared/models/result';

/**
 * this will never be constructed
 */
export interface ValidateAddressParams {
  street: string[];
  countryCode?: string;
  cityLocality?: string;
  postalCode?: string;
  stateProvince?: string;
}

export interface Address {
  street: string[];
  countryCode?: string;
  cityLocality?: string;
  postalCode?: string;
  stateProvince?: string;
  isResidential?: boolean;
}
export class Address {
  constructor(address: Address) {
    Object.assign(this, address);
  }
}

export interface ValidateAddressResult extends IResult {
  isValid: boolean;
  messages: Messages;
  normalized?: Address;
  original?: Address;
}
export class ValidateAddressResult {
  constructor(result: ValidateAddressResult) {
    Object.assign(this, result);
  }
}

export class ValidateAddressConvenienceResult extends ValidateAddressResult {}
