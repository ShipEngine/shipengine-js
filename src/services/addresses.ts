import { AxiosInstance } from 'axios';
import {
  AddressQuery,
  Address,
  AddressQueryResult,
  ShipEngineError,
} from '../models/public';

import { AddressesData } from '../models/AddressesData';

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
    return !addressQueryResult.errors.length;
  };

  /**
   * Try to normalize address
   */
  public normalize = async (
    address: AddressQuery
  ): Promise<Address | undefined> => {
    const addressQueryResult = await this.query(address);
    const normalized = !addressQueryResult.errors.length
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
   * Check if address is valid.
   */
  public validateAddress = async (address: AddressQuery): Promise<boolean> =>
    this.addresses.validate(address);

  /**
   *  Normalize address.
   */
  public normalizeAddress = async (address: AddressQuery): Promise<Address> => {
    const normalized = await this.addresses.normalize(address);
    if (!normalized) {
      throw new ShipEngineError('Address unqueryable, unable to normalize.');
    }
    return normalized;
  };

  /**
   * Get address query data.
   */
  public queryAddress = async (
    address: AddressQuery
  ): Promise<AddressQueryResult> => this.addresses.query(address);
}
