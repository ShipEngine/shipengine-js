import { AxiosInstance } from 'axios';

interface AddressesService {
  validate(address: any): Promise<any>;
}

const createAddressesService = (client: AxiosInstance): AddressesService => {
  return {
    validate: async (address: any) => {
      const { data } = await client.post<any>('/addresses', address);
      return data;
    },
  };
};

export type AddressesServiceAPI = {
  addresses: AddressesService;
  validateAddress: AddressesService['validate'];
};

export const createAddressesConvenienceService = (
  client: AxiosInstance
): AddressesServiceAPI => {
  const addressesServices = createAddressesService(client);
  return {
    addresses: addressesServices,
    validateAddress: addressesServices.validate,
  };
};
