"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipEngine = void 0;
const validate_addresses_1 = require("./validate-addresses");
const list_carriers_1 = require("./list-carriers");
const void_label_with_label_id_1 = require("./void-label-with-label-id");
const config_1 = require("./config");
const track_using_label_id_1 = require("./track-using-label-id");
const track_using_carrier_code_and_tracking_number_1 = require("./track-using-carrier-code-and-tracking-number");
const create_label_from_shipment_details_1 = require("./create-label-from-shipment-details");
const get_rates_with_shipment_details_1 = require("./get-rates-with-shipment-details");
const create_label_from_rate_1 = require("./create-label-from-rate");
/**
 * Exposes the functionality of the ShipEngine API.
 */
class ShipEngine {
    constructor(config) {
        this.config = new config_1.NormalizedConfig(config);
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
        const mergedConfig = config_1.NormalizedConfig.merge(this.config, config);
        return validate_addresses_1.validateAddresses(params, mergedConfig);
    }
    /**
     * Retrieves the carrier accounts that have been connect to your ShipEngine account
     * using the ShipEngine dashboard.
     *
     * @param [config] - Optional configuration overrides for this method call.
     */
    async listCarriers(config) {
        const mergedConfig = config_1.NormalizedConfig.merge(this.config, config);
        return list_carriers_1.listCarriers(mergedConfig);
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
        const mergedConfig = config_1.NormalizedConfig.merge(this.config, config);
        return track_using_carrier_code_and_tracking_number_1.trackUsingCarrierCodeAndTrackingNumber(params, mergedConfig);
    }
    /**
     * Tracks a shipment using the Label ID.
     *
     * @param [labelId]
     * The labelId that contains the package you wish to track.
  
    * @param [config] - Optional configuration overrides for this method call.
     */
    async trackUsingLabelId(labelId, config) {
        const mergedConfig = config_1.NormalizedConfig.merge(this.config, config);
        return track_using_label_id_1.trackUsingLabelId(labelId, mergedConfig);
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
        const mergedConfig = config_1.NormalizedConfig.merge(this.config, config);
        return create_label_from_shipment_details_1.createLabelFromShipmentDetails(params, mergedConfig);
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
        const mergedConfig = config_1.NormalizedConfig.merge(this.config, config);
        return create_label_from_rate_1.createLabelFromRate(params, mergedConfig);
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
        const mergedConfig = config_1.NormalizedConfig.merge(this.config, config);
        return void_label_with_label_id_1.voidLabelWithLabelId(id, mergedConfig);
    }
    /**
     * Retrieve rates for a package with the provided shipment details.
     *
     * @param [config] - Optional configuration overrides for this method call.
     */
    async getRatesWithShipmentDetails(params, config) {
        const mergedConfig = config_1.NormalizedConfig.merge(this.config, config);
        return get_rates_with_shipment_details_1.getRatesWithShipmentDetails(params, mergedConfig);
    }
}
exports.ShipEngine = ShipEngine;
//# sourceMappingURL=shipengine.js.map