import { JsonRpcError } from '../../shared/models/client/client';
import { Either } from '../../utils/either';
import { AddressApi } from './api';
import { CountryCode } from './types/validate/dto/params';
import {
  Address,
  ValidateAddressConvenienceResult,
  ValidateAddressParams,
  ValidateAddressResult,
} from './types/validate/entities';

export class AddressAdvanced {
  #api: AddressApi;
  public constructor(api: AddressApi) {
    this.#api = api;
  }

  public validate = async (
    params: ValidateAddressParams
  ): Promise<Either<JsonRpcError, ValidateAddressResult>> => {
    const response = await this.#api.validateAddress({
      address: {
        country_code: params.countryCode,
        street: params.street,
        city_locality: params.cityLocality,
        postal_code: params.postalCode,
        state_province: params.stateProvince,
      },
    });
    const result = response.map(({ address, valid, messages }) => ({
      isValid: valid,
      messages,
      normalized:
        address !== undefined
          ? {
              street: address?.street ?? [],
              postalCode: address?.postal_code ?? undefined,
              cityLocality: address?.city_locality ?? undefined,
              countryCode: address?.country_code ?? undefined,
              stateProvince: address?.state_province ?? undefined,
              isResidential: address?.residential ?? undefined,
            }
          : undefined,
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
    address: Address
  ): Promise<ValidateAddressConvenienceResult> => {
    const response = await this.address.validate({
      countryCode: address.countryCode as CountryCode,
      street: address.street,
      cityLocality: address.cityLocality,
      postalCode: address.postalCode,
      stateProvince: address.postalCode,
    });
    return response.unsafeCoerce();
  };
}
