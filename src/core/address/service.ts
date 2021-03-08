import { AddressApi } from './api';
import * as Entities from './entities';
import { toThrowable } from '../../utils/either';

export class AddressAdvanced {
  #api: AddressApi;
  public constructor(api: AddressApi) {
    this.#api = api;
  }

  public validate = async (
    params: Entities.ValidateAddressParams
  ): Promise<Entities.ValidateAddressResult> => {
    const result = toThrowable(await this.#api.validateAddress(params));
    return result;
  };
}

/* in this case, address is the same as the params */
export class AddressService {
  address: AddressAdvanced;
  constructor(api: AddressApi) {
    this.address = new AddressAdvanced(api);
  }

  public validateAddress = async (
    address: Entities.Address
  ): Promise<Entities.ValidateAddressResultItem> => {
    const [data] = await this.address.validate([address]);
    return data;
  };
}
