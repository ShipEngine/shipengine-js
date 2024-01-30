import { validateAddresses, } from "./validate-addresses";
import { listCarriers } from "./list-carriers";
import { voidLabelWithLabelId, } from "./void-label-with-label-id";
import { NormalizedConfig } from "./config";
import { trackUsingLabelId, } from "./track-using-label-id";
import { trackUsingCarrierCodeAndTrackingNumber, } from "./track-using-carrier-code-and-tracking-number";
import { createLabelFromShipmentDetails, } from "./create-label-from-shipment-details";
import { getRatesWithShipmentDetails, } from "./get-rates-with-shipment-details";
import { createLabelFromRate, } from "./create-label-from-rate";
/**
 * Exposes the functionality of the ShipEngine API.
 */
export class ShipEngine {
    constructor(config) {
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
    async validateAddresses(params, config) {
        const mergedConfig = NormalizedConfig.merge(this.config, config);
        return validateAddresses(params, mergedConfig);
    }
    /**
     * Retrieves the carrier accounts that have been connect to your ShipEngine account
     * using the ShipEngine dashboard.
     *
     * @param [config] - Optional configuration overrides for this method call.
     */
    async listCarriers(config) {
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
    async trackUsingCarrierCodeAndTrackingNumber(params, config) {
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
    async trackUsingLabelId(labelId, config) {
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
    async createLabelFromShipmentDetails(params, config) {
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
    async createLabelFromRate(params, config) {
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
    async voidLabelWithLabelId(id, config) {
        const mergedConfig = NormalizedConfig.merge(this.config, config);
        return voidLabelWithLabelId(id, mergedConfig);
    }
    /**
     * Retrieve rates for a package with the provided shipment details.
     *
     * @param [config] - Optional configuration overrides for this method call.
     */
    async getRatesWithShipmentDetails(params, config) {
        const mergedConfig = NormalizedConfig.merge(this.config, config);
        return getRatesWithShipmentDetails(params, mergedConfig);
    }
}
//# sourceMappingURL=shipengine.js.map