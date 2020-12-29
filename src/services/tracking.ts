import { AxiosInstance } from 'axios';
import { parseAxiosError } from '../utils';
import {
  TrackingQuery,
  TrackingQueryResult,
  isTrackingQueryByPackageId,
  TrackingInformation,
  ShipEngineError,
} from '../models/public';
import { TrackingData } from '../models/repository';

export class TrackingServiceLowLevel {
  #trackingData: TrackingData;

  constructor(client: AxiosInstance) {
    this.#trackingData = new TrackingData(client);
  }

  public query = async (q: TrackingQuery): Promise<TrackingQueryResult> => {
    let info: TrackingInformation | undefined = undefined;
    try {
      info = isTrackingQueryByPackageId(q)
        ? await this.#trackingData.queryByPackage(q)
        : await this.#trackingData.queryByTrackingNumber(q);
    } catch (err) {
      console.log('Tracking service query error.', parseAxiosError(err));
    }
    const result = new TrackingQueryResult(q, info);
    return result;
  };
}

export class TrackingService {
  tracking: TrackingServiceLowLevel;
  constructor(client: AxiosInstance) {
    this.tracking = new TrackingServiceLowLevel(client);
  }

  trackShipment = async (q: TrackingQuery): Promise<TrackingInformation> => {
    const data = await this.tracking.query(q);
    if (!data.information) {
      throw new ShipEngineError(data.errors.map((el) => el.message).join(', '));
    }
    return data.information;
  };
}
