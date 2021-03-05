import { InternalRpcClient } from '../../shared/models/client/client';
import * as T from '../../shared/models/client/types';

export class TagsApi extends InternalRpcClient {
  createTag = async (tag: T.CreateTagParams) => {
    return this.exec('tag/create', tag, (v) => v);
  };
}
