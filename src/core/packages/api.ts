import { InternalRpcClient } from "../../shared/models/client/client";
import type * as DtoResult from "./types/track/dto/result";
import type * as DtoParams from "./types/track/dto/params";
export class PackageApi extends InternalRpcClient {
  trackPackage = async (params: DtoParams.TrackPackageParamsDto) =>
    this.exec<DtoResult.TrackPackageResultDto>("package/track", params);
}
