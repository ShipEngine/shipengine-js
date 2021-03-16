import { AddressApi } from './core/address/api';
import { AddressService } from './core/address/service';
import { PackageService } from './core/packages/service';
import { PackageApi } from './core/packages/api';

// https://github.com/microsoft/TypeScript/issues/26792#issuecomment-617541464
// eslint-disable-next-line @typescript-eslint/no-empty-interface

export interface ShipEngine extends AddressService, PackageService {}
export class ShipEngine {
  constructor(apiKey: string, baseUrl?: string) {
    const config = [apiKey, baseUrl] as const;
    Object.assign(this, {
      ...new AddressService(new AddressApi(...config)),
      ...new PackageService(new PackageApi(...config)),
    });
  }
}
