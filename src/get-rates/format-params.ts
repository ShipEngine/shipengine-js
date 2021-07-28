import { GetRatesTypes } from ".";

import { Request } from "./types/private";

export function formatParams(
  params: GetRatesTypes.Params
): Request.CalculateRatesRequestBody {
  const request: Request.CalculateRatesRequestBody = {};

  if (params.shipment) {
    request.shipment = {
      shipment: {
        validate_address: params.shipment.validateAddress,
        carrier_id: params.shipment.carrierId,
        service_code: params.shipment.serviceCode,
        external_order_id: params.shipment.externalOrderId,
        items: params.shipment.items
          ? params.shipment.items.map((item) => {
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
            })
          : undefined,
        tax_identifiers: mapTaxIdentifiers(params.shipment.taxIdentifiers),
        external_shipment_id: params.shipment.externalShipmentId,
        ship_date: params.shipment.shipDate as unknown as Request.Date,
        ship_to: params.shipment.shipTo,
        ship_from: params.shipment.shipFrom,
        warehouse_id: params.shipment.wareHouseId,
        return_to: params.shipment.returnTo,
        confirmation: params.shipment.confirmation,
        customs: mapCustoms(params.shipment.customs),
        advanced_options: params.shipment.advancedOptions
          ? mapAdvancedOptions(params.shipment.advancedOptions)
          : undefined,
        origin_type: params.shipment.originType,
        insurance_provider: params.shipment.insuranceProvider,
        order_source_code: params.shipment.orderSourceCode,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        packages: mapPackages(params.shipment.packages!), // Error in generated types
      },
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
        .preferredCurrency as Request.Currency,
    };
  }

  return request;
}

type AdvancedOptions = NonNullable<
  NonNullable<GetRatesTypes.Params["shipment"]>["advancedOptions"]
>;

function mapAdvancedOptions(
  advancedOptions: AdvancedOptions
): Request.AdvancedShipmentOptions {
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

type TaxIdentifiers = NonNullable<
  NonNullable<GetRatesTypes.Params["shipment"]>["taxIdentifiers"]
>;

function mapTaxIdentifiers(
  params?: TaxIdentifiers
): Request.TaxIdentifier[] | undefined {
  if (!params) return undefined;
  return params.map((taxId) => ({
    taxable_entity_type: taxId.taxableEntityType,
    identifier_type: taxId.identifierType,
    issuing_authority: taxId.issuingAuthority,
    value: taxId.value,
  }));
}

type Packages = NonNullable<
  NonNullable<GetRatesTypes.Params["shipment"]>["packages"]
>;

function mapPackages(params: Packages): any[] {
  return params.map((pkg) => ({
    package_code: pkg.packageCode,
    weight: pkg.weight,
    dimensions: pkg.dimensions,
    insured_value: pkg.insuredValue,
    label_messages: pkg.labelMessages,
    external_package_id: pkg.externalPackageId,
  }));
}

type Customs = NonNullable<
  NonNullable<GetRatesTypes.Params["shipment"]>["customs"]
>;

function mapCustoms(
  params?: Customs
): Request.InternationalShipmentOptions | undefined {
  if (!params) return undefined;
  let custom_items: Request.CustomsItem[] = [];
  if (params.customsItems) {
    custom_items = params.customsItems.map((customItem) => ({
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
