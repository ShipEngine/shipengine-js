import { ShipEngineRpcApi } from '../shipengine-rpc/shipengine-rpc-api';

import {
  mapToAddressQueryResult,
  mapToRequestBodyAddress,
} from '../mappers/address';
import { AddressQuery, AddressQueryResult } from '../public';

/**
 * Model that represents the Address Data model
 * This is a data repository, and should just be a simple abstraction
 */

export class AddressesData {
  #api: ShipEngineRpcApi;
  constructor(api: ShipEngineRpcApi) {
    this.#api = api;
  }

  public query = async (v: AddressQuery): AddressQueryResult => {
    const call = {
      address_lines: v.street as string[],
      city_locality: v.cityLocality,
      country_code: v.country,
      state_province: v.stateProvince,
    };
    const { result } = await this.#api.validateAddress(call);
    return mapToAddressQueryResult(result);
  };
}
