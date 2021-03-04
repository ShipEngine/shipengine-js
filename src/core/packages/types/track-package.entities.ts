import { camelize, snakeize, SnakeToCamelCaseObject } from '../../../utils';
import * as Dto from './track-package.dto';

export type TrackPackageResult = SnakeToCamelCaseObject<Dto.TrackPackageResult>;
export type TrackPackageParams = {};

export type ValidateAddressParams = SnakeToCamelCaseObject<
  Dto.TrackPackageParams
>;

export const dtoToTrackPackageResultsEntity = (
  v: Dto.TrackPackageResult
): TrackPackageResult => {
  return camelize(v);
};

export const entityToTrackPackageParamsDto = (
  v: TrackPackageParams
): Dto.TrackPackageParams => {
  return snakeize(v);
};
