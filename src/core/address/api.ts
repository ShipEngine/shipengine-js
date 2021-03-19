import { InternalRpcClient } from '../../shared/models/client/client';
import {
  ValidateAddressParamsDto,
  ValidateAddressResultDto,
} from './types/validate-address.dto';

export class AddressApi extends InternalRpcClient {
  validateAddress = async (validateAddressParams: ValidateAddressParamsDto) =>
    this.exec<ValidateAddressResultDto>(
      'address/validate',
      validateAddressParams
    );
}
