import { InternalRpcClient } from '../../shared/models/client/client';
import * as T from './types';

export class AddressApi extends InternalRpcClient {
  validateAddress = async (validateAddressParams: T.ValidateAddressParams) => {
    return this.exec(
      'address/validate',
      T.toValidateAddressParamsDto(validateAddressParams),
      T.toValidateAddressResult
    );
  };
}
