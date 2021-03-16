import { Compute } from '../../../utils/ts';
import {
  ValidateAddressParamsDto,
  ValidateAddressResultDto,
} from './validate-address.dto';

export type ValidateAddressResult = ValidateAddressResultDto;
export type ValidateAddressParams = ValidateAddressParamsDto;

export type ValidateAddressResultBulk = ValidateAddressResultDto[];
export type ValidateAddressParamsBulk = ValidateAddressParamsDto[];

export type Address = NonNullable<Compute<ValidateAddressResult['address']>>;
