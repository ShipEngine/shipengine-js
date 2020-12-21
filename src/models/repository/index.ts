import { AxiosInstance } from 'axios';
import {
  AddressQuery,
  AddressQueryResult,
  TrackingInformation,
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
    const data = await this.#shipEngineRestAPI.validateAddresses(request);
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
   * Get Tracking Information
   *
   * @param carrierCode - e.g ups
   * @param trackingNumber - e.g. 1Z6Y21Y60300230257
   */
  query = async (
    carrierCode: string,
    trackingNumber: string
  ): Promise<TrackingInformation> => {
    const data = await this.#shipEngineRestAPI.getTrackingLog(
      carrierCode,
      trackingNumber
    );
    const result = mapToTrackingInformation(data);
    return result;
  };

  /**
   * Get Label Information
   *
   * @param labelId - e.g string
   */
  queryLabel = async (labelId: string): Promise<TrackingInformation> => {
    const data = await this.#shipEngineRestAPI.getTrackingLogFromLabel(labelId);
    const result = mapToTrackingInformation(data);
    return result;
  };
}
