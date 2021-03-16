import { getResultOrThrow } from '../../shared/models/result';
import { AddressApi } from './api';
import * as Entities from './entities';

export class AddressAdvanced {
  #api: AddressApi;
  public constructor(api: AddressApi) {
    this.#api = api;
  }

  public validate = async (params: Entities.ValidateAddressParams) => {
    return this.#api.validateAddress(params);
  };
}

/* in this case, address is the same as the params */
export class AddressService {
  address: AddressAdvanced;
  constructor(api: AddressApi) {
    this.address = new AddressAdvanced(api);
  }

  public validateAddress = async (
    address: Entities.ValidateAddressParams
  ): Promise<Entities.Address> => {
    const response = await this.address.validate(address);
    const data = getResultOrThrow(response);
    return data.address!;
  };
}
