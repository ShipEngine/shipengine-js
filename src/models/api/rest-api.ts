import { AxiosInstance } from 'axios';
import { ValidateAddressResponseBody } from '.';
import { AddressQuery, AddressQueryResult } from '../public';
import {
  mapToAddressQueryResult,
  mapToRequestBodyAddress,
} from '../mappers/address';

export class AddressServiceRestAPI {
  private client;
  constructor(client: AxiosInstance) {
    this.client = client;
  }

  public query = async (
    addresses: AddressQuery[]
  ): Promise<AddressQueryResult[]> => {
    const { data } = await this.client.post<ValidateAddressResponseBody>(
      '/addresses/validate',
      addresses.map(mapToRequestBodyAddress)
    );
    const result = data.map(mapToAddressQueryResult);
    return result;
  };
}
