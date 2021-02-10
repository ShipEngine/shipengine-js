import { AxiosInstance } from 'axios';
import { AddressQuery, AddressQueryResult } from '../public';
import {
  mapToAddressQueryResult,
  mapToRequestBodyAddress,
} from '../mappers/address';
import { ShipEngineRestAPI } from '../shipengine-rest';

/**
 * Model that represents the Address Data model
 * This is a data repository, and should just be a simple abstraction
 */

export class AddressesData {
  #shipEngineRestAPI: ShipEngineRestAPI;
  constructor(client: AxiosInstance) {
    this.#shipEngineRestAPI = new ShipEngineRestAPI(client);
  }

  public query = async (
    addresses: AddressQuery[]
  ): Promise<AddressQueryResult[]> => {
    const request = addresses.map(mapToRequestBodyAddress);
    const { data } = await this.#shipEngineRestAPI.validateAddresses(request);
    const result = data.map(mapToAddressQueryResult);
    return result;
  };
}
