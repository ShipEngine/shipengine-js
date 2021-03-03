import { InternalRpcClient } from './client';
import { bimap, id } from '../../../utils';
import {
  CreateTagParams,
  CreateTagResult,
  toValidateAddressResult,
  ValidateAddressResultJSON,
  ValidateAddressParams,
  ValidateAddressParamsJSON,
  toValidateAddressParamsJSON,
} from './types';

export class ShipEngineRpcApiClient extends InternalRpcClient {
  createTag = async (tag: CreateTagParams) => {
    return this.exec<CreateTagParams, CreateTagResult>('tag/create', tag);
  };

  validateAddress = async (validateAddressParams: ValidateAddressParams) => {
    return bimap(
      await this.exec<ValidateAddressParamsJSON, ValidateAddressResultJSON>(
        'address/validate',
        toValidateAddressParamsJSON(validateAddressParams)
      ),
      toValidateAddressResult,
      id
    );
  };
}
