import { AxiosInstance } from 'axios';
import { ValidateAddressResponseBody, AddressToValidate } from '../models/api';
import { AddressQuery, Address, AddressQueryResult } from '../models/Address';
import {
  AddressValidationResult,
  PartialAddress1,
  ResponseMessage,
} from '../models/api/validate-address/validate_address_response_body';
import { assertExists, exists } from '../utils/exists';
import {
  ShipEngineError,
  ShipEngineInfo,
  ShipEngineWarning,
  ShipEngineException,
  ExceptionType,
} from '../models/ShipEngineException';

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
const mapToNormalizedAddress = (matched: PartialAddress1): Address => {
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

const mapToShipEngineExceptions = (
  messages: ResponseMessage[]
): ShipEngineException[] => {
  return messages
    .map(({ type: t, message }) => {
      if (!t || !message) return undefined;
      // this is verbose because may want to conditionally add additional errors based on kind
      if (t === 'error') {
        return new ShipEngineError(message);
      }
      if (t === 'warning') {
        return new ShipEngineWarning(message);
      }
      if (t === 'info') {
        return new ShipEngineInfo(message);
      }
    })
    .filter(exists);
};

const mapToAddressQueryResult = (
  v: AddressValidationResult
): AddressQueryResult => {
  return {
    original: mapToNormalizedAddress(v.original_address),
    exceptions: mapToShipEngineExceptions(v.messages),
    normalized: mapToNormalizedAddress(v.matched_address),
  };
};

const createAddressesService = (client: AxiosInstance) => {
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
     * address contains no errors
     */
    async validate(addresses: AddressQuery[]): Promise<Boolean[]> {
      const addressQueryResult = await this.query(addresses);
      const result = addressQueryResult.map(({ exceptions }) =>
        exceptions.every((el) => el.type !== ExceptionType.ERROR)
      );
      return result;
    },
  };
};

export type AddressesServiceAPI = {
  validateAddress: ValidateAddress;
  addresses: ReturnType<typeof createAddressesService>;
  queryAddress: (address: AddressQuery) => Promise<AddressQueryResult>;
};

interface ValidateAddress {
  (address: AddressQuery): Promise<Boolean>;
}

export const createAddressesConvenienceService = (client: AxiosInstance) => {
  const addressesServices = createAddressesService(client);
  const api: AddressesServiceAPI = {
    addresses: addressesServices,
    validateAddress: async (address) => {
      const [domainAddress] = await addressesServices.validate([address]);
      return domainAddress;
    },
    queryAddress: async (address: AddressQuery) => {
      const [domainQueryResult] = await addressesServices.query([address]);
      return domainQueryResult;
    },
  };
  return api;
};
