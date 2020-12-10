import { AxiosInstance } from 'axios';
import { ValidateAddressResponseBody } from '../models/api';
import {
  AddressQuery,
  Address,
  AddressQueryResult,
  ShipEngineError,
  ShipEngineExceptionType,
} from '../models/public';

import {
  mapToAddressQueryResult,
  mapToRequestBodyAddress,
} from '../models/mappers/address';

class AddressesServiceLowLevel {
  private client;
  constructor(client: AxiosInstance) {
    this.client = client;
  }

  private isValid = (address: AddressQueryResult) => {
    const { normalized, exceptions } = address;
    const result =
      Boolean(normalized) &&
      exceptions.every((el) => el.type !== ShipEngineExceptionType.ERROR);
    return result;
  };

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

  /**
   * address contains no errors if normalized exists and there is no exceptions in any error
   */
  public validate = async (addresses: AddressQuery[]): Promise<boolean[]> => {
    const addressQueryResult = await this.query(addresses);
    const result = addressQueryResult.map(this.isValid);
    return result;
  };

  /**
   * Get array of normalized addresses.
   * Invalid address = undefined.
   */
  public normalize = async (
    addresses: AddressQuery[]
  ): Promise<(Address | undefined)[]> => {
    const addressQueryResult = await this.query(addresses);
    const normalized = addressQueryResult.map((el) =>
      this.isValid(el) ? el.normalized : undefined
    );
    return normalized;
  };
}

export class AddressesService {
  public addresses;
  constructor(client: AxiosInstance) {
    this.addresses = new AddressesServiceLowLevel(client);
  }

  public validateAddress = async (address: AddressQuery): Promise<boolean> => {
    const [domainAddress] = await this.addresses.validate([address]);
    return domainAddress;
  };

  public normalizeAddress = async (
    address: AddressQuery
  ): Promise<Address | undefined> => {
    const { normalized } = await this.queryAddress(address);
    if (!normalized) {
      throw new ShipEngineError('Address unqueryable, unable to normalize.');
    }
    return normalized;
  };

  public queryAddress = async (
    address: AddressQuery
  ): Promise<AddressQueryResult> => {
    const [domainQueryResult] = await this.addresses.query([address]);
    return domainQueryResult;
  };
}
