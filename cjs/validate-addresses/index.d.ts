import { NormalizedConfig } from "../config";
import * as ValidateAddressesTypes from "./types/public";
export { ValidateAddressesTypes };
/**
 * Validates an address and returns the full validation results.
 *
 * https://www.shipengine.com/docs/addresses/validation/
 */
export declare function validateAddresses(params: ValidateAddressesTypes.Params, config: NormalizedConfig): Promise<ValidateAddressesTypes.Result>;
