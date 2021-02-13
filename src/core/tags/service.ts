import { TagsRepository } from './tag-repository';

export class TagsService {
  tags: TagsRepository;
  constructor(tagData: TagsRepository) {
    this.tags = tagData;
  }

  public createTag = async (q: string) => this.tags.create({ name: q });
}
