import {
  validateAddresses,
  ValidateAddressesTypes,
} from "./validate-addresses";
import { listCarriers, ListCarriersTypes } from "./list-carriers";
import {
  voidLabelWithLabelId,
  VoidLabelWithLabelIdTypes,
} from "./void-label-with-label-id";
import { NormalizedConfig, ShipEngineConfig } from "./config";
import {
  TrackUsingLabelIdTypes,
  trackUsingLabelId,
} from "./track-using-label-id";
import {
  TrackUsingCarrierCodeAndTrackingNumberTypes,
  trackUsingCarrierCodeAndTrackingNumber,
} from "./track-using-carrier-code-and-tracking-number";
import {
  createLabelFromShipmentDetails,
  CreateLabelFromShipmentDetailsTypes,
} from "./create-label-from-shipment-details";
import {
  getRatesWithShipmentDetails,
  GetRatesWithShipmentDetailsTypes,
} from "./get-rates-with-shipment-details";
import {
  createLabelFromRate,
  CreateLabelFromRateTypes,
} from "./create-label-from-rate";

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
  ): Promise<ValidateAddressesTypes.Result> {
    const mergedConfig = NormalizedConfig.merge(this.config, config);
    return validateAddresses(params, mergedConfig);
  }

  /**
   * Retrieves the carrier accounts that have been connect to your ShipEngine account
   * using the ShipEngine dashboard.
   *
   * @param [config] - Optional configuration overrides for this method call.
   */
  public async listCarriers(
    config?: ShipEngineConfig
  ): Promise<ListCarriersTypes.Result> {
    const mergedConfig = NormalizedConfig.merge(this.config, config);
    return listCarriers(mergedConfig);
  }

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
  public async trackUsingCarrierCodeAndTrackingNumber(
    params: TrackUsingCarrierCodeAndTrackingNumberTypes.Params,
    config?: ShipEngineConfig
  ): Promise<TrackUsingCarrierCodeAndTrackingNumberTypes.Result> {
    const mergedConfig = NormalizedConfig.merge(this.config, config);
    return trackUsingCarrierCodeAndTrackingNumber(params, mergedConfig);
  }

  /**
   * Tracks a shipment using the Label ID.
   *
   * @param [labelId]
   * The labelId that contains the package you wish to track.

  * @param [config] - Optional configuration overrides for this method call.
   */
  public async trackUsingLabelId(
    labelId: string,
    config?: ShipEngineConfig
  ): Promise<TrackUsingLabelIdTypes.Response> {
    const mergedConfig = NormalizedConfig.merge(this.config, config);
    return trackUsingLabelId(labelId, mergedConfig);
  }
  /**
   * Create a label from shipment details
   *
   * @param label
   * The label that you want to create.
   *
   * @param [config] - Optional configuration overrides for this method call.
   */
  public async createLabelFromShipmentDetails(
    params: CreateLabelFromShipmentDetailsTypes.Params,
    config?: ShipEngineConfig
  ): Promise<CreateLabelFromShipmentDetailsTypes.Result> {
    const mergedConfig = NormalizedConfig.merge(this.config, config);
    return createLabelFromShipmentDetails(params, mergedConfig);
  }

  /**
   * Create a label with a rateId
   *
   * @param rate
   * The rate and additional params for creating a label.
   *
   * @param [config] - Optional configuration overrides for this method call.
   */
  public async createLabelFromRate(
    params: CreateLabelFromRateTypes.Params,
    config?: ShipEngineConfig
  ): Promise<CreateLabelFromRateTypes.Result> {
    const mergedConfig = NormalizedConfig.merge(this.config, config);
    return createLabelFromRate(params, mergedConfig);
  }

  /**
   * Void a label with its Label ID
   *
   * @param label ID
   * The ID for the label being voided.
   *
   * @param [config] - Optional configuration overrides for this method call.
   */
  public async voidLabelWithLabelId(
    id: string,
    config?: ShipEngineConfig
  ): Promise<VoidLabelWithLabelIdTypes.Result> {
    const mergedConfig = NormalizedConfig.merge(this.config, config);
    return voidLabelWithLabelId(id, mergedConfig);
  }

  /**
   * Retrieve rates for a package with the provided shipment details.
   *
   * @param [config] - Optional configuration overrides for this method call.
   */
  public async getRatesWithShipmentDetails(
    params: GetRatesWithShipmentDetailsTypes.Params,
    config?: ShipEngineConfig
  ): Promise<GetRatesWithShipmentDetailsTypes.Result> {
    const mergedConfig = NormalizedConfig.merge(this.config, config);
    return getRatesWithShipmentDetails(params, mergedConfig);
  }
}
