import { AxiosInstance } from 'axios';
import {
  TrackingInformation,
  TrackingQueryByPackageId,
  TrackingQueryByTrackingNumber,
} from '../public';
import { ShipEngineRestAPI } from '../shipengine-rest';
import { mapToTrackingInformation } from '../mappers/tracking';

export class TrackingData {
  #shipEngineRestAPI: ShipEngineRestAPI;
  constructor(client: AxiosInstance) {
    this.#shipEngineRestAPI = new ShipEngineRestAPI(client);
  }

  /**
   * Get Tracking Information via tracking / carrier.
   */
  queryByTrackingNumber = async (
    q: TrackingQueryByTrackingNumber
  ): Promise<TrackingInformation> => {
    const { data } = await this.#shipEngineRestAPI.getTrackingLog(
      q.carrierCode,
      q.trackingNumber
    );
    const result = mapToTrackingInformation(data);
    return result;
  };

  /**
   * Get Tracking Information from package ID.
   */
  queryByPackage = async (
    packageId: TrackingQueryByPackageId
  ): Promise<TrackingInformation | undefined> => {
    const { data } = await this.#shipEngineRestAPI.getTrackingLogFromLabel(
      packageId
    );
    const result = mapToTrackingInformation(data);
    return result;
  };
}
