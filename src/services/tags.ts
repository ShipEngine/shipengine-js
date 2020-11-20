import { AxiosInstance } from 'axios';

interface TagsService {
  get(): Promise<string[]>;
  create(tagName: string): Promise<string>;
}

const createTagsService = (client: AxiosInstance): TagsService => {
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
  tags: TagsService;
  createTag: TagsService['create'];
};

export const createTagsConvenienceService = (
  client: AxiosInstance
): TagsServiceAPI => {
  const tagsServices = createTagsService(client);
  return {
    tags: tagsServices,
    createTag: tagsServices.create,
  };
};
