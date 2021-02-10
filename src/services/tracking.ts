import { AxiosInstance } from 'axios';
import { parseAxiosError } from '../utils';
import {
  TrackingQuery,
  TrackingQueryResult,
  isTrackingQueryByPackageId,
  TrackingInformation,
  ShipEngineError,
  ShipEngineMessage,
} from '../models/public';
import { TrackingData } from '../models/TrackingData';

export class TrackingServiceLowLevel {
  #trackingData: TrackingData;

  constructor(client: AxiosInstance) {
    this.#trackingData = new TrackingData(client);
  }

  public query = async (q: TrackingQuery): Promise<TrackingQueryResult> => {
    let info: TrackingInformation | undefined = undefined;
    const extraMessages: ShipEngineMessage[] = [];
    try {
      info = isTrackingQueryByPackageId(q)
        ? await this.#trackingData.queryByPackage(q)
        : await this.#trackingData.queryByTrackingNumber(q);
    } catch (err) {
      if (err instanceof ShipEngineError) {
        extraMessages.push(err);
      } else {
        console.error(
          'Unknown tracking service Query Error',
          parseAxiosError(err)
        );
      }
    }
    const result = new TrackingQueryResult(q, info, extraMessages);
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
      throw new ShipEngineError(
        data.errors.map((el) => el.message).join(' | ')
      );
    }
    return data.information;
  };
}
