import { JsonRpcError } from '../../shared/models/client/client';
import { Either } from '../../utils/either';
import { AddressApi } from './api';
import {
  ValidateAddressConvenienceResult,
  ValidateAddressParams,
  ValidateAddressResult,
} from './types/validate-address.entities';
import {
  toAddress,
  toValidateAddressParamsDto,
} from './types/validate-address.mappers';

export class AddressAdvanced {
  #api: AddressApi;
  public constructor(api: AddressApi) {
    this.#api = api;
  }

  public validate = async (
    params: ValidateAddressParams
  ): Promise<Either<JsonRpcError, ValidateAddressResult>> => {
    const response = await this.#api.validateAddress(
      toValidateAddressParamsDto(params)
    );
    const result = response.map((v) => ({
      isValid: v.valid,
      messages: v.messages,
      normalized: v.address ? toAddress(v.address) : undefined,
      original: params,
    }));
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
    address: ValidateAddressParams
  ): Promise<ValidateAddressConvenienceResult> => {
    const response = await this.address.validate(address);
    return response.unsafeCoerce();
  };
}
