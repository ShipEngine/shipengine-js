import { AxiosInstance } from 'axios';

export interface ITagsService {
  get(): Promise<string[]>;
  create(tagName: string): Promise<string>;
}

export class TagsService implements ITagsService {
  private client: AxiosInstance;
  constructor(client: TagsService['client']) {
    this.client = client;
  }
  public async get() {
    const { data } = await this.client.get<string[]>('/tags');
    return data;
  }
  public async create(tagName: string) {
    const { data } = await this.client.post<string>(`/tags/${tagName}`, {});
    return data;
  }
}
