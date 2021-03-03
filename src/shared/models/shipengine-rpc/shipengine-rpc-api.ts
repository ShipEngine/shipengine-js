import { InternalRpcClient } from './client';
import { bimap, id } from '../../../utils';
import type * as T from './types';
import { toValidateAddressResult, toValidateAddressParamsDto } from './types';
export class ShipEngineRpcApiClient extends InternalRpcClient {
  createTag = async (tag: T.CreateTagParams) => {
    return this.exec<T.CreateTagParams, T.CreateTagResult>('tag/create', tag);
  };

  validateAddress = async (validateAddressParams: T.ValidateAddressParams) => {
    return bimap(
      await this.exec<T.ValidateAddressParamsDto, T.ValidateAddressResultDto>(
        'address/validate',
        toValidateAddressParamsDto(validateAddressParams)
      ),
      toValidateAddressResult,
      id
    );
  };
}
