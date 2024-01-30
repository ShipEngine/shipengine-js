import { ValidateAddressesTypes } from "./validate-addresses";
import { ListCarriersTypes } from "./list-carriers";
import { VoidLabelWithLabelIdTypes } from "./void-label-with-label-id";
import { ShipEngineConfig } from "./config";
import { TrackUsingLabelIdTypes } from "./track-using-label-id";
import { TrackUsingCarrierCodeAndTrackingNumberTypes } from "./track-using-carrier-code-and-tracking-number";
import { CreateLabelFromShipmentDetailsTypes } from "./create-label-from-shipment-details";
import { GetRatesWithShipmentDetailsTypes } from "./get-rates-with-shipment-details";
import { CreateLabelFromRateTypes } from "./create-label-from-rate";
/**
 * Exposes the functionality of the ShipEngine API.
 */
export declare class ShipEngine {
    /**
     * Global configuration for the ShipEngine API client, such as timeouts,
     * retries, page size, etc. This configuration applies to all method calls,
     * unless specifically overridden when calling a method.
     */
    config: ShipEngineConfig;
    /**
     * Instantiates the ShipEngine API client.
     *
     * @param apiKey
     * Your ShipEngine API key. This can be a production or sandbox key
     * (sandbox keys start with "TEST_")
     */
    constructor(apiKey: string);
    /**
     * Instantiates the ShipEngine API client.
     *
     * @param config - Configuration, such as timeouts, retries, page size, etc.
     */
    constructor(config: ShipEngineConfig);
    /**
     * Validates an address in nearly any country in the world.
     *
     * @param address
     * The address to validate. This can even be an incomplete or improperly
     * formatted address
     *
     * @param [config] - Optional configuration overrides for this method call.
     */
    validateAddresses(params: ValidateAddressesTypes.Params, config?: ShipEngineConfig): Promise<ValidateAddressesTypes.Result>;
    /**
     * Retrieves the carrier accounts that have been connect to your ShipEngine account
     * using the ShipEngine dashboard.
     *
     * @param [config] - Optional configuration overrides for this method call.
     */
    listCarriers(config?: ShipEngineConfig): Promise<ListCarriersTypes.Result>;
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
    trackUsingCarrierCodeAndTrackingNumber(params: TrackUsingCarrierCodeAndTrackingNumberTypes.Params, config?: ShipEngineConfig): Promise<TrackUsingCarrierCodeAndTrackingNumberTypes.Result>;
    /**
     * Tracks a shipment using the Label ID.
     *
     * @param [labelId]
     * The labelId that contains the package you wish to track.
  
    * @param [config] - Optional configuration overrides for this method call.
     */
    trackUsingLabelId(labelId: string, config?: ShipEngineConfig): Promise<TrackUsingLabelIdTypes.Response>;
    /**
     * Create a label from shipment details
     *
     * @param label
     * The label that you want to create.
     *
     * @param [config] - Optional configuration overrides for this method call.
     */
    createLabelFromShipmentDetails(params: CreateLabelFromShipmentDetailsTypes.Params, config?: ShipEngineConfig): Promise<CreateLabelFromShipmentDetailsTypes.Result>;
    /**
     * Create a label with a rateId
     *
     * @param rate
     * The rate and additional params for creating a label.
     *
     * @param [config] - Optional configuration overrides for this method call.
     */
    createLabelFromRate(params: CreateLabelFromRateTypes.Params, config?: ShipEngineConfig): Promise<CreateLabelFromRateTypes.Result>;
    /**
     * Void a label with its Label ID
     *
     * @param label ID
     * The ID for the label being voided.
     *
     * @param [config] - Optional configuration overrides for this method call.
     */
    voidLabelWithLabelId(id: string, config?: ShipEngineConfig): Promise<VoidLabelWithLabelIdTypes.Result>;
    /**
     * Retrieve rates for a package with the provided shipment details.
     *
     * @param [config] - Optional configuration overrides for this method call.
     */
    getRatesWithShipmentDetails(params: GetRatesWithShipmentDetailsTypes.Params, config?: ShipEngineConfig): Promise<GetRatesWithShipmentDetailsTypes.Result>;
}
