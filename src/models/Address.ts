import { ShipEngineException } from './ShipEngineException';

type Street = string | string[];

export type Address = {
  street: Street;
  postalCode: string;
  cityLocality: string;
  country: string;
  stateProvince?: string;
  residential?: boolean;
};

export type AddressQuery = {
  street: Street;
  cityLocality: Address['cityLocality'];
  postalCode: Address['postalCode'];
  country: Address['country'];
};

export type AddressQueryResult = {
  original: AddressQuery;
  normalized?: Address;
  exceptions: ShipEngineException[];
};
