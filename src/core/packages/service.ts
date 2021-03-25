import * as Entities from './types/track-package.entities';
import { PackageApi } from './api';
import { getResultOrThrow } from '../../shared/models/result';
import {
  entityToTrackPackageParamsDto,
  dtoToTrackPackageResultsEntity,
} from './types/track-package.mappers';
import { JsonRpcError } from '../../shared/models/client/client';
import { Either } from '../../utils/either';

export class PackagesAdvanced {
  #api: PackageApi;
  public constructor(api: PackageApi) {
    this.#api = api;
  }

  public track = async (
    params: Entities.TrackPackageParams
  ): Promise<Either<JsonRpcError, Entities.TrackPackageResult>> => {
    return (
      await this.#api.trackPackage(entityToTrackPackageParamsDto(params))
    ).map(dtoToTrackPackageResultsEntity);
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
    return data.unsafeCoerce();
  };
}
