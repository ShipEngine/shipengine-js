import { ShipEngineException } from './ShipEngineException';

type Street = string | string[];

export class Address {
  street: Street;
  postalCode: string;
  cityLocality: string;
  country: string;
  stateProvince: string;
  residential?: boolean;
  get isResidential(): boolean {
    return this.residential || false;
  }
  constructor(
    street: Address['street'],
    postalCode: Address['postalCode'],
    cityLocality: Address['cityLocality'],
    stateProvince: Address['stateProvince'],
    country: Address['country']
  ) {
    // add validation here
    this.street = street;
    this.postalCode = postalCode;
    this.cityLocality = cityLocality;
    this.country = country;
    this.stateProvince = stateProvince;
  }
}

export type AddressQuery = {
  street: Street;
  cityLocality?: Address['cityLocality'];
  stateProvince?: Address['stateProvince'];
  postalCode?: Address['postalCode'];
  country?: Address['country'];
};

export type AddressQueryResult = {
  original: AddressQuery;
  normalized?: Address;
  exceptions: ShipEngineException[];
};
