import { InternalRpcClient } from '../../shared/models/client/client';
import type * as Entities from './types/track-package.entities';
import * as Mappers from './types/track-package.mappers';
export class PackageApi extends InternalRpcClient {
  trackPackage = async (params: Entities.TrackPackageParams) => {
    return this.exec(
      'package/track',
      Mappers.entityToTrackPackageParamsDto(params),
      Mappers.dtoToTrackPackageResultsEntity
    );
  };
}
