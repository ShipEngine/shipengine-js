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

// replace all date strings in generated result -> DateTime
export type TrackPackageResult = {
  information: Overwrite<
    Information,
    {
      events: TrackingEvent[];
      estimatedDelivery: ISOString;
    }
  >;
  messages: MessagesObject;
};
