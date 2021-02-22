import { InternalRpcClient } from './client';
import { CreateTagParams, CreateTagResponse } from './types';

export class ShipEngineRpcApi extends InternalRpcClient {
  createTag = async (tag: CreateTagParams) =>
    this.exec<CreateTagParams, CreateTagResponse>('tag.create', tag);
}
