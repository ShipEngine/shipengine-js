import { InternalRpcClient } from '../../shared/models/client/client';
import { TrackPackageParams } from './types/track-package.dto';
import {
  dtoToTrackPackageResultsEntity,
  entityToTrackPackageParamsDto,
} from './types/track-package.entities';

export class PackageApi extends InternalRpcClient {
  trackPackage = async (params: TrackPackageParams) => {
    return this.exec(
      'package/track',
      entityToTrackPackageParamsDto(params),
      dtoToTrackPackageResultsEntity
    );
  };
}
