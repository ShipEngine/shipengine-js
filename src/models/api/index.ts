import { Overwrite } from 'utility-types';

export type {
  ValidateAddressRequestBody,
  AddressToValidate,
} from './validate-address/validate_address_request_body';

import type { AddressValidationResult as _AddressValidationResult } from './validate-address/validate_address_response_body';

export type AddressValidationResult = Overwrite<
  _AddressValidationResult,
  { matched_address: _AddressValidationResult['matched_address'] | null }
>;

export type ValidateAddressResponseBody = AddressValidationResult[];
