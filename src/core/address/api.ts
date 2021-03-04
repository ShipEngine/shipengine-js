import { InternalRpcClient } from '../../shared/models/client/client';
import * as T from './types';

export class AddressApi extends InternalRpcClient {
  validateAddressIndividual = async (
    validateAddressParams: T.ValidateAddressParams[0]
  ) => {
    return this.exec(
      'address/validate',
      T.toValidateAddressParamsDto([validateAddressParams]),
      (v) => T.toValidateAddressResult(v)[0]
    );
  };
}
