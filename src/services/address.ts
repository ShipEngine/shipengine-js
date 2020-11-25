import { AxiosInstance } from 'axios';
import {
  ValidateAddressResponseBody,
  ValidateAddressRequestBody,
  AddressToValidate,
} from '../models/api';
import { AddressQuery, Address } from '../models/Address';

interface AddressesService {
  validate(address: any): Promise<any>;
}

const mapToRequestBodyAddress = (addr: Address): AddressToValidate => {
  const {
    cityLocality,
    street,
    country,
    postalCode,
    residential,
    stateProvince,
  } = addr;
  return {
    // TODO: create a class for this.
    address_line1: Array.isArray(street) ? street[0] : street,
    address_line2: Array.isArray(street) ? street[1] : undefined,
    address_line3: Array.isArray(street) ? street[2] : undefined,
    city_locality: cityLocality,
    country_code: country || 'US',
    postal_code: postalCode,
    state_province: stateProvince,
    address_residential_indicator: residential ?? 'unknown' ? 'yes' : 'no',
  };
};

const createAddressesService = (client: AxiosInstance): AddressesService => {
  return {
    validate: async (addr: Address) => {
      const { data } = await client.post<ValidateAddressResponseBody>(
        '/addresses/validate',
        [mapToRequestBodyAddress(addr)]
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
    validateAddress: (address: AddressQuery) => {
      return addressesServices.validate(address);
    },
  };
};
