import { AxiosInstance } from 'axios';
import {
  AddressQuery,
  AddressQueryResult,
  TrackingInformation,
  TrackingQueryByPackageId,
  TrackingQueryByTrackingNumber,
} from '../public';

import {
  mapToAddressQueryResult,
  mapToRequestBodyAddress,
} from '../mappers/address';

import { ShipEngineRestAPI } from '../shipengine-rest';
import { mapToTrackingInformation } from '../mappers/tracking';

/**
 * Model that represents the Address Data model
 * This is a data repository, and should just be a simple abstraction
 */
export class AddressesData {
  #shipEngineRestAPI: ShipEngineRestAPI;
  constructor(client: AxiosInstance) {
    this.#shipEngineRestAPI = new ShipEngineRestAPI(client);
  }

  public query = async (
    addresses: AddressQuery[]
  ): Promise<AddressQueryResult[]> => {
    const request = addresses.map(mapToRequestBodyAddress);
    const { data } = await this.#shipEngineRestAPI.validateAddresses(request);
    const result = data.map(mapToAddressQueryResult);
    return result;
  };
}

export class TrackingData {
  #shipEngineRestAPI: ShipEngineRestAPI;
  constructor(client: AxiosInstance) {
    this.#shipEngineRestAPI = new ShipEngineRestAPI(client);
  }

  /**
   * Get Tracking Information via tracking / carrier.
   *
   * @param carrierCode - e.g ups
   * @param trackingNumber - e.g. 1Z6Y21Y60300230257
   */
  queryByTrackingNumber = async (
    q: TrackingQueryByTrackingNumber
  ): Promise<TrackingInformation | undefined> => {
    const { data } = await this.#shipEngineRestAPI.getTrackingLog(
      q.carrierCode,
      q.trackingNumber
    );
    const result = mapToTrackingInformation(data);
    return result;
  };

  /**
   * Get Tracking Information from package ID.
   *
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
