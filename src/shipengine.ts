import {
  validateAddresses,
  ValidateAddressesTypes,
} from "./validate-addresses";
// import { listCarrierAccounts } from "./list-carrier-accounts";
import { NormalizedConfig, ShipEngineConfig } from "./config";
import { TrackByLabelIdTypes, trackByLabelId } from "./track-by-label-id";
import {
  TrackByTrackingNumberTypes,
  trackByTrackingNumber,
} from "./track-by-tracking-number";

/**
 * Exposes the functionality of the ShipEngine API.
 */
export class ShipEngine {
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
  public async validateAddresses(
    params: ValidateAddressesTypes.Params,
    config?: ShipEngineConfig
  ): Promise<ValidateAddressesTypes.Response> {
    const mergedConfig = NormalizedConfig.merge(this.config, config);
    return validateAddresses(params, mergedConfig);
  }

  // /**
  //  * Retrieves the carrier accounts that have been connect to your ShipEngine account
  //  * using the ShipEngine dashboard.
  //  *
  //  * @param [config] - Optional configuration overrides for this method call.
  //  */
  // public async listCarrierAccounts(
  //   config?: ShipEngineConfig
  // ): Promise<unknown> {
  //   const mergedConfig = NormalizedConfig.merge(this.config, config);
  //   return listCarrierAccounts(mergedConfig);
  // }

  /**
   * Tracks a package based on the trackingNumber and carrierCode.
   *
   * @param [trackingNumber]
   * The trackingNumber of the package you wish to track. You must also provide the carrierCode and no packageId.
   * OR trackingNumber and carrierCode
   *
   * @param [carrierCode]
   * The carrierCode for the trackingNumber you are using to track the package. You must also provide the trackingNumber
   * and no packageId.
   *
   * @param [config] - Optional configuration overrides for this method call.
   */
  public async trackByTrackingNumber(
    params: TrackByTrackingNumberTypes.Params,
    config?: ShipEngineConfig
  ): Promise<TrackByTrackingNumberTypes.Response> {
    const mergedConfig = NormalizedConfig.merge(this.config, config);
    return trackByTrackingNumber(params, mergedConfig);
  }

  /**
   * Tracks a shipment by Label ID.
   *
   * @param [labelId]
   * The labelId that contains the package you wish to track.

  * @param [config] - Optional configuration overrides for this method call.
   */
  public async trackByLabelId(
    params: TrackByLabelIdTypes.Params,
    config?: ShipEngineConfig
  ): Promise<TrackByLabelIdTypes.Response> {
    const mergedConfig = NormalizedConfig.merge(this.config, config);
    return trackByLabelId(params, mergedConfig);
  }
}
