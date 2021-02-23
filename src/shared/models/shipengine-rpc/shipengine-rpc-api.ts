import { InternalRpcClient } from './client';
import { CreateTagParams, CreateTagResult } from './types';

export class ShipEngineRpcApiClient extends InternalRpcClient {
  createTag = async (tag: CreateTagParams) => {
    return this.exec<CreateTagParams, CreateTagResult>('tag/create', tag);
  };
}
