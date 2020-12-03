import { Overwrite } from 'utility-types';

export type {
  ValidateAddressRequestBody,
  AddressToValidate,
} from './validate-address/validate_address_request_body';

import type {
  AddressValidationResult as _AddressValidationResult,
  PartialAddress as _PartialAddress,
  PartialAddress1 as _PartialAddress1,
  ResponseMessage as _ResponseMessage,
} from './validate-address/validate_address_response_body';

export type ResponseMessage = _ResponseMessage;

export type ValidateAddressResponseBody = AddressValidationResult[];

export type MatchedAddress = _PartialAddress1 | _PartialAddress;

/**
 * OpenAPI Definition is wrong -- matched_address will come back null
 */
export type AddressValidationResult = Overwrite<
  _AddressValidationResult,
  { matched_address: MatchedAddress | null }
>;
