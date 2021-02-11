import { ShipEngineRpcApi } from '../shipengine-rpc/shipengine-rpc-api';
import {
  Address,
  AddressQuery,
  AddressQueryResult,
  MessageType,
} from '../public';

/**
 * Model that represents the Address Data model
 * This is a data repository, and should just be a simple abstraction
 */

export class AddressesData {
  #api: ShipEngineRpcApi;
  constructor(api: ShipEngineRpcApi) {
    this.#api = api;
  }

  public validate = async (query: AddressQuery) => {
    const params = {
      address_lines: query.street as string[],
      city_locality: query.cityLocality,
      country_code: query.country,
      postal_code: query.postalCode,
      state_province: query.stateProvince,
    };
    const { result } = await this.#api.validateAddress(params);
    if (
      !result ||
      result.validated_address.is_residential === undefined ||
      result.validated_address.address_lines === undefined
    ) {
      throw Error('no result');
    }
    const { validated_address: validatedAddress } = result;
    return new AddressQueryResult(
      query,
      result.messages.map((el) => ({
        message: el.message,
        type: el.message_type as MessageType,
      })),
      new Address(
        validatedAddress.address_lines || [],
        validatedAddress.postal_code,
        validatedAddress.city_locality,
        validatedAddress.state_province,
        validatedAddress.country_code,
        validatedAddress.is_residential
      )
    );
  };
}
