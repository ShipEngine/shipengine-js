import { AxiosInstance } from 'axios';
import { ValidateAddressResponseBody } from '../models/api';
import {
  AddressQuery,
  Address,
  AddressQueryResult,
  ShipEngineError,
  ExceptionType,
} from '../models/public';

import {
  mapToAddressQueryResult,
  mapToRequestBodyAddress,
} from '../models/mappers/address';

const createAddressesService = (client: AxiosInstance) => {
  const isValid = (address: AddressQueryResult) => {
    const { normalized, exceptions } = address;
    const result =
      Boolean(normalized) &&
      exceptions.every((el) => el.type !== ExceptionType.ERROR);
    return result;
  };

  return {
    async query(addresses: AddressQuery[]): Promise<AddressQueryResult[]> {
      const { data } = await client.post<ValidateAddressResponseBody>(
        '/addresses/validate',
        addresses.map(mapToRequestBodyAddress)
      );
      const result = data.map(mapToAddressQueryResult);
      return result;
    },

    /**
     * address contains no errors if normalized exists and there is no exceptions in any error
     */
    async validate(addresses: AddressQuery[]): Promise<boolean[]> {
      const addressQueryResult = await this.query(addresses);
      const result = addressQueryResult.map(isValid);
      return result;
    },

    /**
     * Get array of normalized addresses.
     * Invalid address = undefined.
     */
    async normalize(
      addresses: AddressQuery[]
    ): Promise<(Address | undefined)[]> {
      const addressQueryResult = await this.query(addresses);
      const normalized = addressQueryResult.map((el) =>
        isValid(el) ? el.normalized : undefined
      );
      return normalized;
    },
  };
};

export type AddressesServiceAPI = {
  validateAddress: ValidateAddress;
  addresses: ReturnType<typeof createAddressesService>;
  normalizeAddress: (address: AddressQuery) => Promise<Address | undefined>;
  queryAddress: (address: AddressQuery) => Promise<AddressQueryResult>;
};

interface ValidateAddress {
  (address: AddressQuery): Promise<boolean>;
}

export const createAddressesConvenienceService = (
  client: AxiosInstance
): AddressesServiceAPI => {
  const addressesServices = createAddressesService(client);
  const api: AddressesServiceAPI = {
    addresses: addressesServices,
    async validateAddress(address) {
      const [domainAddress] = await addressesServices.validate([address]);
      return domainAddress;
    },
    // todo, accept an array of addresses as well.
    async queryAddress(address: AddressQuery) {
      const [domainQueryResult] = await addressesServices.query([address]);
      return domainQueryResult;
    },
    async normalizeAddress(address) {
      const { normalized } = await this.queryAddress(address);
      if (!normalized) {
        throw new ShipEngineError('Address unqueryable, unable to normalize.');
      }
      return normalized;
    },
  };
  return api;
};
