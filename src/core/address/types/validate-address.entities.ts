import {
  ValidateAddressParamsDto,
  ValidateAddressResultDto,
} from './validate-address.dto';

export type ValidateAddressResultItem = ValidateAddressResultDto;

export type ValidateAddressResult = ValidateAddressResultItem[];

export type ValidateAddressParams = ValidateAddressParamsDto;

/* entity parameters for the convenience method */
export type Address = ValidateAddressParamsDto[0];
