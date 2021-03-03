import { AddressApi } from './api';
import { ValidateAddressParams, ValidateAddressResult } from './types';
import { toThrowable } from '../../utils/either';

export class AddressAdvanced {
  #api: AddressApi;
  public constructor(api: AddressApi) {
    this.#api = api;
  }

  public validate = async (
    params: ValidateAddressParams
  ): Promise<ValidateAddressResult> => {
    return toThrowable(await this.#api.validateAddress(params));
  };
}

/* in this case, address is the same as the params */
type Address = ValidateAddressParams;
export class AddressService {
  address: AddressAdvanced;
  constructor(api: AddressApi) {
    this.address = new AddressAdvanced(api);
  }

  public validateAddress = async (
    address: Address
  ): Promise<ValidateAddressResult> => {
    const data = await this.address.validate(address);
    return data;
  };
}
