import { AxiosInstance } from 'axios';
import {
  AddressToValidate,
  ValidateAddressResponseBody,
} from './shipengine-openapi/address';

import {
  GetTrackingLogResponseBody,
  GetTrackingLogFromLabelResponseBody,
} from './shipengine-openapi/tracking';

/**
 * Model that represents the actual ShipEngine Rest API.
 * This should be able to swapped out cleanly with another generated model if we so desire.
 */
export class ShipEngineRestAPI {
  #client: AxiosInstance;
  constructor(client: AxiosInstance) {
    this.#client = client;
  }

  /* node_modules/shipengine-json-schema/index.json */
  getTrackingLog = async (carrierCode: string, trackingNumber: string) => {
    return await this.#client.get<GetTrackingLogResponseBody>('/tracking', {
      params: {
        carrier_code: carrierCode,
        tracking_number: trackingNumber,
      },
    });
  };

  getTrackingLogFromLabel = async (packageId: string) => {
    return await this.#client.get<GetTrackingLogFromLabelResponseBody>(
      `/labels/${packageId}/track`
    );
  };

  validateAddresses = async (v: AddressToValidate[]) => {
    return await this.#client.post<ValidateAddressResponseBody>(
      '/addresses/validate',
      v
    );
  };
}
