import { ISOString } from '../../../../shared/models/date-time';
import { Overwrite } from '../../../../utils/ts';
import type * as DtoResult from './dto/result';

type PackageId = string;

export type TrackPackageParams =
  | {
      carrierCode: string;
      trackingNumber: string;
    }
  | {
      packageId: PackageId;
    };

type Event = Overwrite<
  DtoResult.Event,
  {
    carrierDateTime: ISOString;
    dateTime: ISOString;
  }
>;

type Shipment = Overwrite<
  DtoResult.Shipment,
  {
    estimatedDelivery: ISOString;
  }
>;

export interface TrackPackageResult {
  events: Event[];
  package: DtoResult.Package;
  shipment: Shipment;
}
