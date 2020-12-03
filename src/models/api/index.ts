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

export type AddressValidationResult = Overwrite<
  _AddressValidationResult,
  { matched_address: _AddressValidationResult['matched_address'] | null }
>;

export type ResponseMessage = _ResponseMessage;

export type ValidateAddressResponseBody = AddressValidationResult[];
export type MatchedAddress = _PartialAddress1 | _PartialAddress;
