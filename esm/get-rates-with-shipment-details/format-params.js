export function formatParams(params) {
    const request = {};
    if (params.shipment) {
        request.shipment = {
            validate_address: params.shipment.validateAddress,
            carrier_id: params.shipment.carrierId,
            service_code: params.shipment.serviceCode,
            external_order_id: params.shipment.externalOrderId,
            items: formatShipmentItems(params.shipment.items),
            tax_identifiers: mapTaxIdentifiers(params.shipment.taxIdentifiers),
            external_shipment_id: params.shipment.externalShipmentId,
            ship_date: params.shipment.shipDate,
            ship_to: mapShipTo(params.shipment.shipTo),
            ship_from: mapShipFrom(params.shipment.shipFrom),
            warehouse_id: params.shipment.wareHouseId,
            return_to: mapReturnTo(params.shipment.returnTo),
            confirmation: params.shipment.confirmation,
            customs: mapCustoms(params.shipment.customs),
            advanced_options: mapAdvancedOptions(params.shipment.advancedOptions),
            origin_type: params.shipment.originType,
            insurance_provider: params.shipment.insuranceProvider,
            order_source_code: params.shipment.orderSourceCode,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            packages: mapPackages(params.shipment.packages), // Error in generated types
        };
    }
    if (params.shipmentId) {
        request.shipment_id = params.shipmentId;
    }
    if (params.rateOptions) {
        request.rate_options = {
            carrier_ids: params.rateOptions.carrierIds,
            package_types: params.rateOptions.packageTypes,
            service_codes: params.rateOptions.serviceCodes,
            calculate_tax_amount: params.rateOptions.calculateTaxAmount,
            preferred_currency: params.rateOptions
                .preferredCurrency,
        };
    }
    return request;
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
function formatShipmentItems(shipmentItems) {
    if (!shipmentItems) {
        return undefined;
    }
    return shipmentItems.map((item) => {
        return {
            name: item.name,
            sales_order_id: item.salesOrderId,
            sales_order_item_id: item.salesOrderItemId,
            quantity: item.quantity,
            sku: item.sku,
            external_order_id: item.externalOrderId,
            external_order_item_id: item.externalOrderItemId,
            asin: item.asin,
            order_source_code: item.orderSourceCode,
        };
    });
}
function mapAdvancedOptions(advancedOptions) {
    if (!advancedOptions) {
        return undefined;
    }
    return {
        bill_to_account: advancedOptions.billToAccount,
        bill_to_country_code: advancedOptions.billToCountryCode,
        bill_to_party: advancedOptions.billToParty,
        bill_to_postal_code: advancedOptions.billToPostalCode,
        contains_alcohol: advancedOptions.containsAlcohol,
        delivered_duty_paid: advancedOptions.deliveryDutyPaid,
        dry_ice: advancedOptions.dryIce,
        dry_ice_weight: advancedOptions.dryIceWeight,
        non_machinable: advancedOptions.nonMachinable,
        saturday_delivery: advancedOptions.saturdayDelivery,
        use_ups_ground_freight_pricing: advancedOptions.useUPSGroundFreightPricing,
        freight_class: advancedOptions.freightClass,
        custom_field1: advancedOptions.customField1,
        custom_field2: advancedOptions.customField2,
        custom_field3: advancedOptions.customField3,
        origin_type: advancedOptions.originType,
        shipper_release: advancedOptions.shipperRelease,
        collect_on_delivery: advancedOptions.collectOnDelivery
            ? {
                payment_type: advancedOptions.collectOnDelivery.paymentType,
                payment_amount: advancedOptions.collectOnDelivery.paymentAmount,
            }
            : undefined,
    };
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
function mapPackages(params) {
    if (!params) {
        return undefined;
    }
    return params.map((pkg) => ({
        package_code: pkg.packageCode,
        weight: pkg.weight,
        dimensions: pkg.dimensions,
        insured_value: pkg.insuredValue,
        label_messages: pkg.labelMessages,
        external_package_id: pkg.externalPackageId,
    }));
}
function mapCustoms(params) {
    if (!params)
        return undefined;
    let custom_items = [];
    if (params.customsItems) {
        custom_items = params.customsItems.map((customItem) => ({
            description: customItem.description,
            quantity: customItem.quantity,
            value: customItem.value,
            harmonized_tariff_code: customItem.harmonizedTariffCode,
            country_of_origin: customItem.countryOfOrigin,
            unit_of_measure: customItem.unitOfMeasure,
            sku: customItem.sku,
            sku_description: customItem.skuDescription,
        }));
    }
    return {
        contents: params.contents,
        non_delivery: params.nonDelivery,
        customs_items: custom_items,
    };
}
//# sourceMappingURL=format-params.js.map