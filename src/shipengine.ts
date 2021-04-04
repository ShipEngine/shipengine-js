import { Address, validateAddress } from "./address";

export class ShipEngine {
  constructor(apiKey: string) {}

  async validateAddress(address: Address, apiKey: string): Promise<object> {
    return validateAddress(address, apiKey);
  }
}
