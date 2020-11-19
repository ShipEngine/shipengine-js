import { AxiosInstance } from 'axios';

export interface ITagsService {
  get(): Promise<string[]>;
  create(tagName: string): Promise<string>;
}

/**
 * Publicly-accessible service for anything related to tags
 */
const TagsServiceAdvanced = (client: AxiosInstance): ITagsService => {
  return {
    get: async () => {
      const { data } = await client.get<string[]>('/tags');
      return data;
    },
    create: async (tagName: string) => {
      const { data } = await client.post<string>(`/tags/${tagName}`, {});
      return data;
    },
  };
};

export type TagsServiceAPI = {
  tags: ITagsService;
  createTag: ITagsService['create'];
};

export const createTagsServiceAPI = (client: AxiosInstance): TagsServiceAPI => {
  const tagsServices = TagsServiceAdvanced(client);
  return {
    tags: tagsServices,
    createTag: tagsServices.create,
  };
};
