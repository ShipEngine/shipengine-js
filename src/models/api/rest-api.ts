import { AxiosInstance } from 'axios';
import { AddressToValidate, ValidateAddressResponseBody } from '.';
import { AddressQuery, AddressQueryResult } from '../public';
import {
  mapToAddressQueryResult,
  mapToRequestBodyAddress,
} from '../mappers/address';

/**
 * Model that represents the actual ShipEngine Rest API.
 * This should be able to swapped out cleanly with another generated model if we so desire.
 */
class ShipEngineRestAPI {
  private client;
  constructor(client: AxiosInstance) {
    this.client = client;
  }

  validateAddresses = async (v: AddressToValidate[]) => {
    return (
      await this.client.post<ValidateAddressResponseBody>(
        '/addresses/validate',
        v
      )
    ).data;
  };
}

/**
 * Model that represents the Address Data model
 * This is a data repository, and should just be a simple abstraction
 */
export class AddressesData {
  private shipEngineRestAPI;
  constructor(client: AxiosInstance) {
    this.shipEngineRestAPI = new ShipEngineRestAPI(client);
  }

  public query = async (
    addresses: AddressQuery[]
  ): Promise<AddressQueryResult[]> => {
    const request = addresses.map(mapToRequestBodyAddress);
    const data = await this.shipEngineRestAPI.validateAddresses(request);
    const result = data.map(mapToAddressQueryResult);
    return result;
  };
}

export class TrackingData {
  private shipEngineRestAPI;
  constructor(client: AxiosInstance) {
    this.shipEngineRestAPI = new ShipEngineRestAPI(client);
  }
}
