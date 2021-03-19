import { ISOString } from '../../../shared/models/date-time';
import { Overwrite } from '../../../utils/ts';
import { EventElement, Information, MessagesObject } from './track-package.dto';

type PackageId = string;

export type TrackPackageParams =
  | {
      carrierCode: string;
      trackingNumber: string;
    }
  | {
      packageId: PackageId;
    }
  | PackageId;

type TrackingEvent = Overwrite<
  EventElement,
  {
    dateTime: ISOString;
  }
>;

export interface TrackPackageResult {
  information: TrackPackageInfo;
  messages: MessagesObject;
}
export class TrackPackageResult {
  constructor(result: TrackPackageResult) {
    Object.assign(this, result);
  }
}

export type TrackPackageInfo = Overwrite<
  Information,
  {
    events: TrackingEvent[];
    estimatedDelivery: ISOString;
  }
>;
