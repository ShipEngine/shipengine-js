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
  residential: boolean | undefined;
  get isResidential(): boolean {
    return this.residential || false;
  }
  constructor(
    street: Address['street'],
    postalCode: Address['postalCode'],
    cityLocality: Address['cityLocality'],
    stateProvince: Address['stateProvince'],
    country: Address['country'],
    residential: Address['residential']
  ) {
    // add validation here
    this.street = street;
    this.postalCode = postalCode;
    this.cityLocality = cityLocality;
    this.country = country;
    this.stateProvince = stateProvince;
    this.residential = residential;
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
