import { getResultOrThrow } from '../../shared/models/result';
import { AddressApi } from './api';
import * as Entities from './entities';

import {
  toValidateAddressConvenience,
  toValidateAddressParamsDto,
  toValidateAddressResult,
} from './types/validate-address.mappers';

export class AddressAdvanced {
  #api: AddressApi;
  public constructor(api: AddressApi) {
    this.#api = api;
  }

  public validate = async (params: Entities.ValidateAddressParams) => {
    const response = await this.#api.validateAddress(
      toValidateAddressParamsDto(params)
    );
    const result = response.map(toValidateAddressResult);
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
    address: Entities.ValidateAddressParams
  ): Promise<Entities.ValidateAddressConvenienceResult> => {
    const response = await this.address.validate(address);
    const result = getResultOrThrow(response.map(toValidateAddressConvenience));
    return result;
  };
}
