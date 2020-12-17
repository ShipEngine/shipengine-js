import {
  ShipEngineException,
  ShipEngineInfo,
  ShipEngineWarning,
} from './ShipEngineException';

type Street = string | string[];

export class Address {
  street: Street;
  postalCode: string;
  cityLocality: string;
  country: string;
  stateProvince: string;
  private residentialIndicator: boolean | undefined;
  get isResidential(): boolean {
    return this.residentialIndicator || false;
  }
  constructor(
    street: string[],
    postalCode = '',
    cityLocality = '',
    stateProvince = '',
    country = 'US',
    residentialIndicator: boolean | undefined
  ) {
    // add validation here
    this.street = street;
    this.postalCode = postalCode;
    this.cityLocality = cityLocality;
    this.country = country;
    this.stateProvince = stateProvince;
    this.residentialIndicator = residentialIndicator;
  }
}

export type AddressQuery = {
  street: Street;
  cityLocality?: Address['cityLocality'];
  stateProvince?: Address['stateProvince'];
  postalCode?: Address['postalCode'];
  country?: Address['country'];
};

export interface AddressQueryResult {
  original: AddressQuery;
  normalized?: Address;
  exceptions: ShipEngineException[];
  readonly info: ShipEngineInfo[];
  readonly warnings: ShipEngineWarning[];
  readonly errors: ShipEngineWarning[];
  readonly isValid: boolean;
}
