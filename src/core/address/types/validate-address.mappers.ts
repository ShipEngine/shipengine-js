import type {
  ValidateAddressParamsDto,
  ValidateAddressResultDto,
} from './validate-address.dto';

import type {
  ValidateAddressParams,
  ValidateAddressResult,
} from './validate-address.entities';

export const toValidateAddressParamsDto = (
  v: ValidateAddressParams
): ValidateAddressParamsDto => {
  return v;
};
export const toValidateAddressResult = (
  v: ValidateAddressResultDto
): ValidateAddressResult => {
  return v;
};
