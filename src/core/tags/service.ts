import { TagsApi } from './api';
import { CreateTagParams } from '../../shared/models/client/types';
import { toThrowable } from '../../utils';
export class TagsAdvanced {
  #api: TagsApi;
  public constructor(api: TagsApi) {
    this.#api = api;
  }

  public create = async (params: CreateTagParams) => {
    const result = await this.#api.createTag(params);
    return toThrowable(result);
  };
}

export class TagsService {
  tags: TagsAdvanced;
  public constructor(api: TagsApi) {
    this.tags = new TagsAdvanced(api);
  }

  public createTag = async (q: string) => {
    const data = await this.tags.create({ name: q });
    return data.name;
  };
}
