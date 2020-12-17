import { Overwrite } from 'utility-types';

import type {
  AddressValidationResult as _AddressValidationResult,
  PartialAddress as _PartialAddress,
  PartialAddress1 as _PartialAddress1,
  ResponseMessage as _ResponseMessage,
} from './validate-address/validate_address_response_body';

import type {
  ValidateAddressRequestBody as _ValidateAddressRequestBody,
  AddressToValidate as _AddressToValidate,
} from './validate-address/validate_address_request_body';

/**
 * @hidden
 */
export type ValidateAddressRequestBody = _ValidateAddressRequestBody;

/**
 * @hidden
 */
export type AddressToValidate = _AddressToValidate;

/**
 * @hidden
 */
export type ResponseMessage = _ResponseMessage;

/**
 * @hidden
 */
export type ValidateAddressResponseBody = AddressValidationResult[];

/**
 * @hidden
 */
export type MatchedAddress = _PartialAddress1 | _PartialAddress;

/**
 * OpenAPI Definition is wrong -- matched_address will come back null
 * @hidden
 */
export type AddressValidationResult = Overwrite<
  _AddressValidationResult,
  { matched_address: MatchedAddress | null }
>;

export * from './rest-api';
