import { AxiosInstance } from 'axios';
import {
  AddressQuery,
  Address,
  AddressQueryResult,
  ShipEngineError,
} from '../models/public';

import { AddressesData } from '../models/api/rest-api';

export class AddressesServiceLowLevel {
  #addressesData: AddressesData;
  constructor(client: AxiosInstance) {
    this.#addressesData = new AddressesData(client);
  }

  /**
   * Get address query data
   */
  public query = async (address: AddressQuery): Promise<AddressQueryResult> => {
    const [domainQueryResult] = await this.#addressesData.query([address]);
    return domainQueryResult;
  };

  /**
   * Check if address is valid
   */
  public validate = async (address: AddressQuery): Promise<boolean> => {
    const addressQueryResult = await this.query(address);
    return addressQueryResult.isValid;
  };

  /**
   * Try to normalize address
   */
  public normalize = async (
    address: AddressQuery
  ): Promise<Address | undefined> => {
    const addressQueryResult = await this.query(address);
    const normalized = addressQueryResult.isValid
      ? addressQueryResult.normalized
      : undefined;
    return normalized;
  };
}

export class AddressesService {
  public addresses;
  constructor(client: AxiosInstance) {
    this.addresses = new AddressesServiceLowLevel(client);
  }

  /**
   * Check if address is valid
   */
  public validateAddress: AddressesServiceLowLevel['validate'] = async (
    address
  ) => this.addresses.validate(address);

  /**
   * Try to normalize address
   */
  public normalizeAddress: AddressesServiceLowLevel['normalize'] = async (
    address
  ) => {
    const normalized = await this.addresses.normalize(address);
    if (!normalized) {
      throw new ShipEngineError('Address unqueryable, unable to normalize.');
    }
    return normalized;
  };

  /**
   * Get address query data
   */
  public queryAddress: AddressesServiceLowLevel['query'] = async (
    address: AddressQuery
  ) => this.addresses.query(address);
}
