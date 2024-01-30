"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatParams = void 0;
function formatParams(params) {
    return {
        shipment: mapShipment(params.shipment),
        is_return_label: params.isReturnLabel,
        rma_number: params.rmaNumber,
        charge_event: params.chargeEvent,
        outbound_label_id: params.outboundLabelId,
        validate_address: params.validateAddress,
        label_download_type: params.labelDownloadType,
        label_format: params.labelFormat,
        display_scheme: params.displayScheme,
        label_layout: params.labelLayout,
        label_image_id: params.labelImageId,
    };
}
exports.formatParams = formatParams;
function mapShipment(params) {
    if (!params)
        return undefined;
    return {
        external_order_id: params.externalOrderId,
        items: params.items,
        tax_identifiers: mapTaxIdentifiers(params.taxIdentifiers),
        external_shipment_id: params.externalShipmentId,
        ship_to: mapShipTo(params.shipTo),
        ship_from: mapShipFrom(params.shipFrom),
        warehouse_id: params.warehouseId,
        return_to: mapReturnTo(params.returnTo),
        confirmation: params.confirmation,
        customs: mapCustoms(params.customs),
        advanced_options: mapAdvancedOptions(params.advancedOptions),
        origin_type: params.originType,
        insurance_provider: params.insuranceProvider,
        order_source_code: params.orderSourceCode,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        service_code: params.serviceCode,
        carrier_id: params.carrierId,
        packages: mapPackages(params.packages),
    };
}
function mapShipTo(params) {
    if (!params)
        return undefined;
    return {
        name: params.name,
        phone: params.phone,
        company_name: params.companyName,
        address_line1: params.addressLine1,
        address_line2: params.addressLine2,
        address_line3: params.addressLine3,
        city_locality: params.cityLocality,
        state_province: params.stateProvince,
        postal_code: params.postalCode,
        country_code: params.countryCode,
        address_residential_indicator: params.addressResidentialIndicator,
    };
}
function mapShipFrom(params) {
    if (!params)
        return undefined;
    return {
        name: params.name,
        phone: params.phone,
        company_name: params.companyName,
        address_line1: params.addressLine1,
        address_line2: params.addressLine2,
        address_line3: params.addressLine3,
        city_locality: params.cityLocality,
        state_province: params.stateProvince,
        postal_code: params.postalCode,
        country_code: params.countryCode,
        address_residential_indicator: params.addressResidentialIndicator,
    };
}
function mapReturnTo(params) {
    if (!params)
        return undefined;
    return {
        name: params.name,
        phone: params.phone,
        company_name: params.companyName,
        address_line1: params.addressLine1,
        address_line2: params.addressLine2,
        address_line3: params.addressLine3,
        city_locality: params.cityLocality,
        state_province: params.stateProvince,
        postal_code: params.postalCode,
        country_code: params.countryCode,
        address_residential_indicator: params.addressResidentialIndicator,
    };
}
function mapPackages(params) {
    return params.map((pkg) => ({
        package_code: pkg.packageCode,
        weight: pkg.weight,
        dimensions: pkg.dimensions,
        insured_value: pkg.insuredValue,
        label_messages: pkg.labelMessages,
        external_package_id: pkg.externalPackageId,
    }));
}
function mapTaxIdentifiers(params) {
    if (!params)
        return undefined;
    return params.map((taxId) => ({
        taxable_entity_type: taxId.taxableEntityType,
        identifier_type: taxId.identifierType,
        issuing_authority: taxId.issuingAuthority,
        value: taxId.value,
    }));
}
function mapCustoms(params) {
    if (!params)
        return undefined;
    let custom_items = [];
    if (params.customsItems) {
        custom_items = params.customsItems.map((customItem) => ({
            quantity: customItem.quantity,
            value: customItem.value,
            harmonized_tariff_code: customItem.harmonizedTariffCode,
            country_of_origin: customItem.countryOfOrigin,
            unit_of_measure: customItem.unitOfMeasure,
            sku: customItem.sku,
            sku_description: customItem.skuDescription,
            description: customItem.description,
        }));
    }
    return {
        contents: params.contents,
        non_delivery: params.nonDelivery,
        customs_items: custom_items,
    };
}
function mapAdvancedOptions(params) {
    if (!params)
        return undefined;
    return {
        bill_to_account: params.billToAccount,
        bill_to_country_code: params.billToCountryCode,
        bill_to_party: params.billToParty,
        bill_to_postal_code: params.billToPostalCode,
        contains_alcohol: params.containsAlcohol,
        delivered_duty_paid: params.deliveredDutyPaid,
        dry_ice: params.dryIce,
        dry_ice_weight: params.dryIceWeight,
        non_machinable: params.nonMachinable,
        saturday_delivery: params.saturdayDelivery,
        use_ups_ground_freight_pricing: params.useUpsGroundFreightPricing,
        freight_class: params.freightClass,
        custom_field1: params.customField1,
        custom_field2: params.customField2,
        custom_field3: params.customField3,
        origin_type: params.originType,
        shipper_release: params.shipperRelease,
        collect_on_delivery: mapCollectOnDelivery(params.collectOnDelivery),
    };
}
function mapCollectOnDelivery(params) {
    if (!params)
        return undefined;
    return {
        payment_type: params.paymentType,
        payment_amount: mapPaymentAmount(params.paymentAmount),
    };
}
function mapPaymentAmount(params) {
    if (!params)
        return undefined;
    return {
        currency: params.currency,
        amount: params.amount,
    };
}
//# sourceMappingURL=format-params.js.map