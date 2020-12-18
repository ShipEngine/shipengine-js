import {
  AddressValidationResult,
  AddressToValidate,
  MatchedAddress,
  ResponseMessage,
} from '../shipengine-rest/shipengine-openapi';
import {
  AddressQueryResult,
  Address,
  AddressQuery,
  ShipEngineError,
  ShipEngineInfo,
  ShipEngineWarning,
  ShipEngineMessage,
} from '../public';
import { exists } from '../../utils/exists';

/**
 * map from dto do domain model
 * @param v - address validation result
 * @hidden
 */
export const mapToAddressQueryResult = (
  v: AddressValidationResult
): AddressQueryResult => {
  const exceptions = mapToShipEngineExceptions(v.messages);
  const normalized = v.matched_address
    ? mapToNormalizedAddress(v.matched_address)
    : undefined;
  return new AddressQueryResult(
    mapToNormalizedAddress(v.original_address),
    exceptions,
    normalized
  );
};

/**
 * map from dto to domain model
 * @hidden
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
    matched.postal_code || undefined,
    matched.city_locality || undefined,
    matched.state_province || undefined,
    matched.country_code || undefined,
    residentialIndicator
  );
};

/**
 * map from domain model to dto (to send down the wire)
 * @hidden
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

/**
 * map from dto to domain model
 * @param messages
 * @hidden
 */
export const mapToShipEngineExceptions = (
  messages: ResponseMessage[]
): ShipEngineMessage[] => {
  return messages
    .map(({ type: t, message = '' }) => {
      if (!t) return undefined;
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
