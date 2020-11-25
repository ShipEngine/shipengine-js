import { ShipEngineException } from './ShipEngineException';

export type Address = {
  name?: string;
  postalCode: string;
  companyName?: string;
  cityLocality?: string;
  stateProvince?: string;
  residential?: boolean;
};

export type AddressQuery = {
  street: string | string[];
  cityLocality: Address['cityLocality'];
  postalCode: Address['postalCode'];
  country: string;
};

export type AddressQueryResult = {
  original: AddressQuery;
  normalized?: Address;
  // this has a specif
  exceptions: ShipEngineException[];
};
