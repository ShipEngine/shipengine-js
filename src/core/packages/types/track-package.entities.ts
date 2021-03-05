import { type } from 'os';
import { camelize, SnakeToCamelCaseObject } from '../../../utils';
import * as Dto from './track-package.dto';

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

export const entityToTrackPackageParamsDto = (
  trackPackageParams: TrackPackageParams
): Dto.TrackPackageParams => {
  if (typeof trackPackageParams === 'string') {
    return {
      package_id: trackPackageParams,
    };
  } else if ('packageId' in trackPackageParams) {
    return {
      package_id: trackPackageParams.packageId,
    };
  } else {
    return {
      carrier_code: trackPackageParams.carrierCode,
      tracking_number: trackPackageParams.trackingNumber,
    };
  }
};

export type TrackPackageResult = SnakeToCamelCaseObject<Dto.TrackPackageResult>;

export const dtoToTrackPackageResultsEntity = (
  v: Dto.TrackPackageResult
): TrackPackageResult => {
  return camelize(v);
};
