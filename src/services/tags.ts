import { AxiosInstance } from 'axios';

class TagsServiceLowLevel {
  private client;
  constructor(client: AxiosInstance) {
    this.client = client;
  }
  public get = async () => {
    const { data } = await this.client.get<string[]>('/tags');
    return data;
  };

  public create = async (tagName: string) => {
    const { data } = await this.client.post<string>(`/tags/${tagName}`, {});
    return data;
  };
}

export class TagsService {
  public tags;
  constructor(client: AxiosInstance) {
    this.tags = new TagsServiceLowLevel(client);
  }
  public createTag = async (tagName: string) => {
    return this.tags.create(tagName);
  };
}
