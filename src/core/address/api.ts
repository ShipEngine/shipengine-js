import { InternalRpcClient } from '../../shared/models/client/client';
import { AddressValidationParamsDto } from './types/validate/dto/params';
import { AddressValidationResultDto } from './types/validate/dto/result';

export class AddressApi extends InternalRpcClient {
  validateAddress = async (validateAddressParams: AddressValidationParamsDto) =>
    this.exec<AddressValidationResultDto>(
      'address/validate',
      validateAddressParams
    );
}
