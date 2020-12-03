import {
  AddressValidationResult,
  AddressToValidate,
  MatchedAddress,
  ResponseMessage,
} from '../api';
import { AddressQueryResult, Address, AddressQuery } from '../Address';
import { exists } from '../../utils/exists';

import {
  ShipEngineError,
  ShipEngineInfo,
  ShipEngineWarning,
  ShipEngineException,
} from '../ShipEngineException';

export const mapToAddressQueryResult = (
  v: AddressValidationResult
): AddressQueryResult => {
  return {
    original: mapToNormalizedAddress(v.original_address),
    exceptions: mapToShipEngineExceptions(v.messages),
    normalized: v.matched_address
      ? mapToNormalizedAddress(v.matched_address)
      : undefined,
  };
};

/**
 * map from dto to domain model
 */

export const mapToNormalizedAddress = (matched: MatchedAddress): Address => {
  const street = [
    matched.address_line1,
    matched.address_line2,
    matched.address_line3,
  ].filter(exists);

  const resId = matched.address_residential_indicator;
  const residentialIndicator =
    resId === undefined || resId === 'unknown' ? undefined : resId === 'yes';

  return new Address(
    street,
    matched.postal_code || '',
    matched.city_locality || '',
    matched.state_province || '',
    matched.country_code || 'US',
    residentialIndicator
  );
};

/**
 * map from domain model to dto (to send down the wire)
 */
export const mapToRequestBodyAddress = (
  address: AddressQuery
): AddressToValidate => {
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

export const mapToShipEngineExceptions = (
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
