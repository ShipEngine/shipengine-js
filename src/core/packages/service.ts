import * as Entities from './types/track-package.entities';
import { PackageApi } from './api';
import { getShipEngineResultOrThrow } from '../../utils';

export class PackagesAdvanced {
  #api: PackageApi;
  public constructor(api: PackageApi) {
    this.#api = api;
  }

  public track = async (params: Entities.TrackPackageParams) => {
    return this.#api.trackPackage(params);
  };
}

export class PackageService {
  package: PackagesAdvanced;
  constructor(api: PackageApi) {
    this.package = new PackagesAdvanced(api);
  }

  public trackPackage = async (
    tracking: Entities.TrackPackageParams
  ): Promise<Entities.TrackPackageResult> => {
    const data = await this.package.track(tracking);
    return getShipEngineResultOrThrow(data);
  };
}
