import {
  TrackPackageParams,
  TrackPackageResult,
} from './types/track-package.entities';
import { PackageApi } from './api';
import { toThrowable } from '../../utils';

export class PackagesAdvanced {
  #api: PackageApi;
  public constructor(api: PackageApi) {
    this.#api = api;
  }

  public track = async (
    params: TrackPackageParams
  ): Promise<TrackPackageResult> => {
    return toThrowable(await this.#api.trackPackage(params));
  };
}

/* in this case, tracking is the same as the params */
type Tracking = TrackPackageParams;
export class TrackingService {
  package: PackagesAdvanced;
  constructor(api: PackageApi) {
    this.package = new PackagesAdvanced(api);
  }

  public track = async (tracking: Tracking): Promise<TrackPackageResult> => {
    const data = await this.package.track(tracking);
    return data;
  };
}
