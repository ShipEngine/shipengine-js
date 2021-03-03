import { InternalRpcClient } from './client';
import * as T from './types';

export class ShipEngineRpcApiClient extends InternalRpcClient {
  createTag = async (tag: T.CreateTagParams) => {
    return this.exec('tag/create', tag, (v) => v);
  };

  validateAddress = async (validateAddressParams: T.ValidateAddressParams) => {
    return this.exec(
      'address/validate',
      T.toValidateAddressParamsDto(validateAddressParams),
      T.toValidateAddressResult
    );
  };
}
