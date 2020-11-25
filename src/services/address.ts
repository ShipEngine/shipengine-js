import { AxiosInstance } from 'axios';
import { ValidateAddressResponseBody, AddressToValidate } from '../models/api';
import { AddressQuery, Address } from '../models/Address';
import { AddressValidationResult } from '../models/api/validate-address/validate_address_response_body';
import { assertExists, exists } from '../utils/exists';
import { AddressResidentialIndicator } from '../models/api/validate-address/validate_address_request_body';

/**
 * map from domain model to dto (to send down the wire)
 */
const mapToRequestBodyAddress = (address: AddressQuery): AddressToValidate => {
  const { cityLocality, street, country, postalCode, stateProvince } = address;
  return {
    address_line1: Array.isArray(street) ? street[0] : street,
    address_line2: Array.isArray(street) ? street[1] : undefined,
    address_line3: Array.isArray(street) ? street[2] : undefined,
    city_locality: cityLocality,
    country_code: country || 'US',
    postal_code: postalCode,
    state_province: stateProvince,
  };
};

/**
 * map from dto to domain model
 */
const mapToNormalizedAddress = (address: AddressValidationResult): Address => {
  const { matched_address: matched } = address;

  const street = [
    matched.address_line1,
    matched.address_line2,
    matched.address_line3,
  ].filter(exists);

  if (!street.length) {
    // this should not happen under normal circumstances
    throw Error('no street defined!');
  }

  // These elements are nullable in the open-api definition
  assertExists(matched.postal_code, 'postal code');
  assertExists(matched.city_locality, 'city');
  assertExists(matched.state_province, 'state');

  const resId = matched.address_residential_indicator;
  const residentialIndicator =
    resId === undefined || resId === 'unknown' ? undefined : resId === 'yes';

  return new Address(
    street,
    matched.postal_code,
    matched.city_locality,
    matched.state_province,
    matched.country_code || 'US',
    residentialIndicator
  );
};

const createAddressesService = (client: AxiosInstance) => {
  return {
    /**
     * validate multiple addresses
     */
    validate: async (addresses: AddressQuery[]) => {
      const { data } = await client.post<ValidateAddressResponseBody>(
        '/addresses/validate',
        addresses.map(mapToRequestBodyAddress)
      );
      const address = data.map(mapToNormalizedAddress);
      return address;
    },
  };
};

export type AddressesServiceAPI = ReturnType<
  typeof createAddressesConvenienceService
>;

export const createAddressesConvenienceService = (client: AxiosInstance) => {
  const addressesServices = createAddressesService(client);
  return {
    addresses: addressesServices,
    /**
     * validate single address
     */
    validateAddress: async (address: AddressQuery) => {
      const [domainAddress] = await addressesServices.validate([address]);
      return domainAddress;
    },
  };
};
