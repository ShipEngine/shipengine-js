import { InternalRpcClient } from './client';
import {
  CreateTagParams,
  CreateTagResult,
  ValidateAddressParams,
  ValidateAddressResult,
} from './types';

export class ShipEngineRpcApiClient extends InternalRpcClient {
  createTag = async (tag: CreateTagParams) => {
    return this.exec<CreateTagParams, CreateTagResult>('tag/create', tag);
  };

  validateAddress = async (validateAddressParams: ValidateAddressParams) => {
    return this.exec<ValidateAddressParams, ValidateAddressResult>(
      'address/validate',
      validateAddressParams
    );
  };
}
