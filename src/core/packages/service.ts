import * as Entities from './types/entities';
import { PackageApi } from './api';
import { JsonRpcError } from '../../shared/models/client/client';
import { Either } from '../../utils/either';
import { CarrierCode } from './types/track/dto/params';

export class PackageService {
  package: PackagesAdvanced;
  constructor(api: PackageApi) {
    this.package = new PackagesAdvanced(api);
  }

  public trackPackage = async (
    tracking: Entities.TrackPackageParams
  ): Promise<Entities.TrackPackageResult> => {
    const data = await this.package.track(tracking);
    return data.unsafeCoerce();
  };
}

export class PackagesAdvanced {
  #api: PackageApi;
  public constructor(api: PackageApi) {
    this.#api = api;
  }

  public track = async (
    params: Entities.TrackPackageParams
  ): Promise<Either<JsonRpcError, Entities.TrackPackageResult>> => {
    const data = await this.#api.trackPackage({
      carrier_code:
        'packageId' in params ? undefined : (params.carrierCode as CarrierCode),
      tracking_number:
        'packageId' in params ? undefined : params.trackingNumber,
      package_id: 'packageId' in params ? params.packageId : undefined,
    });
    // map is only ran if response is successful
    return data.map((trackPackageResult) => {
      return {
        // write huge amounts of mapping code that only snake cases stuff.
      };
    });
  };
}
