import { ShipEngineRpcApiClient } from '../../shared/models/shipengine-rpc/shipengine-rpc-api';
import { ValidateAddressParams } from '../../shared/models/shipengine-rpc/types';
import { toThrowable } from '../../utils/either';

export class AddressAdvanced {
  #api: ShipEngineRpcApiClient;
  public constructor(api: ShipEngineRpcApiClient) {
    this.#api = api;
  }

  public validate = async (params: ValidateAddressParams) => {
    return toThrowable(await this.#api.validateAddress(params));
  };
}

/* in this case, address is the same as the params */
type Address = ValidateAddressParams;
export class AddressService {
  address: AddressAdvanced;
  constructor(api: ShipEngineRpcApiClient) {
    this.address = new AddressAdvanced(api);
  }

  public validateAddress = async (address: Address) => {
    const data = await this.address.validate(address);
    return data;
  };
}
