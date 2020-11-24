import { AxiosInstance } from 'axios';
import {
  ValidateAddressRequestBody,
  ValidateAddressResponseBody,
} from '../models/api';

interface AddressesService {
  validate(address: any): Promise<any>;
}

const createAddressesService = (client: AxiosInstance): AddressesService => {
  return {
    validate: async (address: ValidateAddressRequestBody) => {
      const { data } = await client.post<ValidateAddressResponseBody>(
        '/addresses/validate',
        address
      );
      return data;
    },
  };
};

export type AddressesServiceAPI = {
  addresses: AddressesService;
  // TODO
  validateAddress: (address: any) => any;
};

export const createAddressesConvenienceService = (
  client: AxiosInstance
): AddressesServiceAPI => {
  const addressesServices = createAddressesService(client);
  return {
    addresses: addressesServices,
    validateAddress: (address: any) => {
      return addressesServices.validate([address]);
    },
  };
};
