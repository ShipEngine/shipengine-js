import { PackageApi } from "./api";
import { JsonRpcError } from "../../shared/models/client/client";
import { Either } from "../../utils/either";
import { ISOString } from "../../shared/models/date-time";
import { CarrierCode } from "./types/track/dto/params";
import * as Entities from "./types/track/entities";

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
      carrierCode:
        "packageId" in params ? undefined : (params.carrierCode as CarrierCode),
      trackingNumber: "packageId" in params ? undefined : params.trackingNumber,
      packageid: "packageId" in params ? params.packageId : undefined,
    });
    // map is only ran if response is successful
    return data.map((r) => {
      return {
        ...r,
        package: {
          ...r.package,
        },
        shipment: {
          ...r.shipment,
          estimatedDelivery: new ISOString(r.shipment.estimatedDelivery),
        },

        events: r.events.map((e) => ({
          ...e,
          dateTime: new ISOString(e.dateTime),
          carrierDateTime: new ISOString(e.carrierDateTime),
        })),
      };
    });
  };
}
