import { AddressApi } from './core/address/api';
import { AddressService } from './core/address/service';
import { TagsApi } from './core/tags/api';
import { TagsService } from './core/tags/service';

// https://github.com/microsoft/TypeScript/issues/26792#issuecomment-617541464
// eslint-disable-next-line @typescript-eslint/no-empty-interface

export interface ShipEngine extends TagsService, AddressService {}
export class ShipEngine {
  constructor(apiKey: string, baseUrl?: string) {
    const config = [apiKey, baseUrl] as const;
    Object.assign(this, {
      ...new TagsService(new TagsApi(...config)),
      ...new AddressService(new AddressApi(...config)),
    });
  }
}
