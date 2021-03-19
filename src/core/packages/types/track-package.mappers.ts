import * as Entities from './track-package.entities';
import * as Dto from './track-package.dto';
import { ISOString } from '../../../shared/models/date-time';

export const dtoToTrackPackageResultsEntity = (
  trackPackageResult: Dto.TrackPackageResult
): Entities.TrackPackageResult => {
  return new Entities.TrackPackageResult({
    information: {
      ...trackPackageResult.information,
      events: trackPackageResult.information.events.map((event) => ({
        ...event,
        dateTime: new ISOString(event.dateTime),
      })),
      estimatedDelivery: new ISOString(
        trackPackageResult.information.estimatedDelivery
      ),
    },
    messages: trackPackageResult.messages,
  });
};

export const entityToTrackPackageParamsDto = (
  trackPackageParams: Entities.TrackPackageParams
): Dto.TrackPackageParams => {
  if (typeof trackPackageParams === 'string') {
    return {
      packageId: trackPackageParams,
    };
  } else if ('packageId' in trackPackageParams) {
    return {
      packageId: trackPackageParams.packageId,
    };
  } else {
    return {
      carrierCode: trackPackageParams.carrierCode,
      trackingNumber: trackPackageParams.trackingNumber,
    };
  }
};
