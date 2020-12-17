import {
  ShipEngineError,
  ShipEngineException,
  ShipEngineExceptionType,
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

export interface AddressQuery {
  street: Street;
  cityLocality?: string;
  stateProvince?: string;
  postalCode?: string;
  country?: string;
}

export class AddressQueryResult {
  original: AddressQuery;
  normalized?: Address;
  exceptions: ShipEngineException[];

  get info(): ShipEngineInfo[] {
    return this.exceptions.filter(
      (el) => el.type === ShipEngineExceptionType.INFO
    );
  }

  get warnings(): ShipEngineWarning[] {
    return this.exceptions.filter(
      (el) => el.type === ShipEngineExceptionType.WARNING
    );
  }
  get errors(): ShipEngineError[] {
    return this.exceptions.filter(
      (el) => el.type === ShipEngineExceptionType.ERROR
    );
  }

  get isValid(): boolean {
    const result =
      Boolean(this.normalized) &&
      this.exceptions.every((el) => el.type !== ShipEngineExceptionType.ERROR);
    return result;
  }

  constructor(
    original: AddressQuery,
    exceptions: ShipEngineException[],
    normalized?: Address
  ) {
    this.original = original;
    this.normalized = normalized;
    this.exceptions = exceptions;
  }
}
