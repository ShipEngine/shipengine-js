import { TagsApi } from '../tags/api';
import { ValidateAddressParams } from '../../shared/models/client/types';
import { toThrowable } from '../../utils/either';

export class AddressAdvanced {
  #api: TagsApi;
  public constructor(api: TagsApi) {
    this.#api = api;
  }

  public validate = async (params: ValidateAddressParams) => {
    return console.log(params);
  };
}

/* in this case, address is the same as the params */
type Address = ValidateAddressParams;
export class AddressService {
  address: AddressAdvanced;
  constructor(api: TagsApi) {
    this.address = new AddressAdvanced(api);
  }

  public validateAddress = async (address: Address) => {
    const data = await this.address.validate(address);
    return data;
  };
}
