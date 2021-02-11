import { getMessageMixin, MessageFields, ShipEngineMessage } from './Messages';
export * from '../repository/AddressesData';

type Street = string | string[];

export class Address {
  street: Street;
  postalCode: string;
  cityLocality: string;
  country: string;
  stateProvince: string;
  isResidential: boolean | undefined;

  constructor(
    street: string[],
    postalCode = '',
    cityLocality = '',
    stateProvince = '',
    country = 'US',
    residentialIndicator = false
  ) {
    // add validation here
    this.street = street;
    this.postalCode = postalCode;
    this.cityLocality = cityLocality;
    this.country = country;
    this.stateProvince = stateProvince;
    this.isResidential = residentialIndicator;
  }
}

export interface AddressQuery {
  street: Street;
  cityLocality?: string;
  stateProvince?: string;
  postalCode?: string;
  country?: string;
}

// mix-in MessageFields
export interface AddressQueryResult extends MessageFields {}

export class AddressQueryResult {
  original: AddressQuery;
  normalized?: Address;
  constructor(
    original: AddressQuery,
    messages: ShipEngineMessage[],
    normalized?: Address
  ) {
    Object.assign(this, getMessageMixin(messages));
    this.original = original;
    this.normalized = normalized;
  }
}
