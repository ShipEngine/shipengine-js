import {
  AddressQuery,
  AddressQueryResult,
  AddressesData,
} from '../models/public';

export class AddressesService {
  public addresses;
  constructor(addresses: AddressesData) {
    this.addresses = addresses;
  }

  /**
   * Check if address is valid.
   */
  public validateAddress = async (address: AddressQuery): Promise<boolean> => {
    const addressQueryResult = await this.addresses.validate(address);
    return !addressQueryResult.errors.length;
  };

  /**
   *  Normalize address.
   */
  public normalizeAddress = async (address: AddressQuery) => {
    const addressQueryResult = await this.addresses.validate(address);
    const normalized = !addressQueryResult.errors.length
      ? addressQueryResult.normalized
      : undefined;
    return normalized;
  };

  /**
   * Get address query data.
   */
  public queryAddress = async (
    address: AddressQuery
  ): Promise<AddressQueryResult> => this.addresses.validate(address);
}
