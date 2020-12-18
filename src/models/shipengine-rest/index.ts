import { AxiosInstance } from 'axios';
import {
  AddressToValidate,
  ValidateAddressResponseBody,
  GetTrackingLogResponseBody,
  GetTrackingLogFromLabelResponseBody,
} from './shipengine-openapi';

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
  getTrackingLog = async () => {
    return (await this.#client.get<GetTrackingLogResponseBody>('/tracking'))
      .data;
  };

  getTrackingLogFromLabel = async (labelId: string) => {
    return (
      await this.#client.get<GetTrackingLogFromLabelResponseBody>(
        `/labels/${labelId}/track`
      )
    ).data;
  };

  validateAddresses = async (v: AddressToValidate[]) => {
    return (
      await this.#client.post<ValidateAddressResponseBody>(
        '/addresses/validate',
        v
      )
    ).data;
  };
}
