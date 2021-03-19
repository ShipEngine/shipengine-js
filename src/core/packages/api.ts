import { InternalRpcClient } from '../../shared/models/client/client';
import type * as Dto from './types/track-package.dto';
export class PackageApi extends InternalRpcClient {
  trackPackage = async (params: Dto.TrackPackageParams) =>
    this.exec<Dto.TrackPackageResult>('package/track', params);
}
