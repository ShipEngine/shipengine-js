import { AddressApi } from './api';
import { ValidateAddressParams, ValidateAddressResult } from './types';
import { toThrowable } from '../../utils/either';

type ValidateAddressIndividualParams = ValidateAddressParams[0];
type ValidateAddressIndividualResult = ValidateAddressResult[0];
type Address = ValidateAddressIndividualParams;
export class AddressAdvanced {
  #api: AddressApi;
  public constructor(api: AddressApi) {
    this.#api = api;
  }

  public validate = async (
    params: ValidateAddressIndividualParams
  ): Promise<ValidateAddressIndividualResult> => {
    const result = toThrowable(
      await this.#api.validateAddressIndividual(params)
    );
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
  ): Promise<ValidateAddressIndividualResult> => {
    const data = await this.address.validate(address);
    return data;
  };
}
