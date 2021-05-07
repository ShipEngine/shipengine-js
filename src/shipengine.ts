import { EventEmitter } from "./isomorphic.node";
import {
  Address,
  AddressValidationResult,
  NormalizedAddress,
} from "./address/public-types";
import { validateAddress } from "./address/validate-address";
import { normalizeAddress } from "./address/normalize-address";
import { NormalizedConfig, ShipEngineConfig } from "./config";
import { ShipEngineError } from "./errors";

/**
 * Exposes the functionality of the ShipEngine API.
 */
export class ShipEngine extends EventEmitter {
  /**
   * Global configuration for the ShipEngine API client, such as timeouts,
   * retries, page size, etc. This configuration applies to all method calls,
   * unless specifically overridden when calling a method.
   */
  public config: ShipEngineConfig;

  /**
   * Instantiates the ShipEngine API client.
   *
   * @param apiKey
   * Your ShipEngine API key. This can be a production or sandbox key
   * (sandbox keys start with "TEST_")
   */
  public constructor(apiKey: string);

  /**
   * Instantiates the ShipEngine API client.
   *
   * @param config - Configuration, such as timeouts, retries, page size, etc.
   */
  public constructor(config: ShipEngineConfig);

  public constructor(config: string | ShipEngineConfig) {
    super();
    this.config = new NormalizedConfig(config);
  }

  /**
   * Validates an address in nearly any country in the world.
   *
   * @param address
   * The address to validate. This can even be an incomplete or improperly
   * formatted address
   *
   * @param [config] - Optional configuration overrides for this method call.
   */
  public async validateAddress(
    address: Address,
    config?: ShipEngineConfig
  ): Promise<AddressValidationResult> {
    const mergedConfig = NormalizedConfig.merge(this.config, config);
    return validateAddress(address, mergedConfig, this);
  }

  public async normalizeAddress(
    address: Address,
    config?: ShipEngineConfig
  ): Promise<NormalizedAddress | ShipEngineError> {
    const mergedConfig = NormalizedConfig.merge(this.config, config);
    return normalizeAddress(address, mergedConfig, this);
  }
}
