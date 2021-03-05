import { InternalRpcClient } from '../../shared/models/client/client';
import { ValidateAddressParams } from './types/validate-address.entities';
import {
  toValidateAddressParamsDto,
  toValidateAddressResult,
} from './types/validate-address.mappers';

export class AddressApi extends InternalRpcClient {
  validateAddress = async (validateAddressParams: ValidateAddressParams) => {
    return this.exec(
      'address/validate',
      toValidateAddressParamsDto(validateAddressParams),
      toValidateAddressResult
    );
  };
}
