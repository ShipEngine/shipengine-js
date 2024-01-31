import { GetRatesWithShipmentDetailsTypes } from ".";
import { Response } from "./types/private";

// TODO: update types to allow null/undefined

export function formatResponse(
  response: Response.CalculateRatesResponseBody
): GetRatesWithShipmentDetailsTypes.Result {
  return {
    shipmentId: response.shipment_id!, // Error in generated types
    carrierId: response.carrier_id || null,
    serviceCode: response.service_code || null,
    externalOrderId: response.external_order_id || null,
    items: formatShipmentItems(response.items),
    taxIdentifiers: formatTaxIdentifiers(response.tax_identifiers),
    externalShipmentId: response.external_shipment_id || null,
    shipDate: response.ship_date!, // Error in generated types
    createdAt: response.created_at!, // Error in generated types
    modifiedAt: response.modified_at!, // Error in generated types
    shipmentStatus: response.shipment_status!, // Error in generated types
    shipTo: formatShippingAddress(response.ship_to!) || null, // Error in generated types
    shipFrom: formatShippingAddress(response.ship_from!) || null, // Error in generated types
    warehouseId: response.warehouse_id || null,
    returnTo: formatShippingAddress(response.return_to!), // Error in generated types
    confirmation: response.confirmation!, // Error in generated types
    customs: formatCustoms(response.customs!), // Error in generated types
    advancedOptions: formatAdvancedOptions(response.advanced_options!), // Error in generated types
    originType: response.origin_type || null,
    insuranceProvider: response.insurance_provider || "none",
    tags: response.tags!, // Error in generated types
    orderSourceCode: response.order_source_code || null,
    packages: formatPackages(response.packages!), // Error in generated types
    totalWeight: {
      value: response.total_weight!.value, // Error in generated types
      unit: response.total_weight!.unit, // Error in generated types
    },
    rateResponse: {
      rates: formatRates(response.rate_response!.rates!), // Error in generated types
      invalidRates: formatRates(response.rate_response!.invalid_rates!), // Error in generated types
      rateRequestId: response.rate_response!.rate_request_id || null, // Error in generated types
      shipmentId: response.rate_response!.shipment_id || null, // Error in generated types
      createdAt: response.rate_response!.created_at || null, // Error in generated types
      status: response.rate_response!.status || null, // Error in generated types
      errors: response.rate_response!.errors
        ? formatErrors(response.rate_response!.errors)
        : null, // Error in generated types
    },
  };
}
type ErrorType = NonNullable<
  GetRatesWithShipmentDetailsTypes.Result["rateResponse"]["errors"]
>[0]["errorType"];
type ErrorCode = NonNullable<
  GetRatesWithShipmentDetailsTypes.Result["rateResponse"]["errors"]
>[0]["errorCode"];

function formatErrors(
  errors: Response.Error[]
): NonNullable<
  GetRatesWithShipmentDetailsTypes.Result["rateResponse"]["errors"]
> {
  return errors.map((error) => {
    return {
      errorSource: error.error_source,
      errorType: error.error_type as ErrorType,
      errorCode: error.error_code as ErrorCode,
      message: error.message,
    };
  });
}

function formatRates(
  rates: Response.Rate[]
): GetRatesWithShipmentDetailsTypes.Result["rateResponse"]["rates"] {
  return rates.map((rate) => {
    return {
      rateId: rate.rate_id,
      rateType: rate.rate_type,
      carrierId: rate.carrier_id,
      shippingAmount: {
        currency: rate.shipping_amount.currency,
        amount: rate.shipping_amount.amount,
      },
      insuranceAmount: {
        currency: rate.insurance_amount.currency,
        amount: rate.insurance_amount.amount,
      },
      confirmationAmount: {
        currency: rate.confirmation_amount.currency,
        amount: rate.confirmation_amount.amount,
      },
      otherAmount: {
        currency: rate.other_amount.currency,
        amount: rate.other_amount.amount,
      },
      taxAmount: rate.tax_amount
        ? { currency: rate.tax_amount.currency, amount: rate.tax_amount.amount }
        : null,
      zone: rate.zone,
      packageType: rate.package_type,
      deliveryDays: rate.delivery_days || null,
      guaranteedService: rate.guaranteed_service,
      estimatedDeliveryDate: rate.estimated_delivery_date || null,
      carrierDeliveryDays: rate.carrier_delivery_days || null,
      shipDate: rate.ship_date || null,
      negotiatedRate: rate.negotiated_rate,
      serviceType: rate.service_type,
      serviceCode: rate.service_code,
      trackable: rate.trackable,
      carrierCode: rate.carrier_code,
      carrierNickname: rate.carrier_nickname,
      carrierFriendlyName: rate.carrier_friendly_name,
      validationStatus: rate.validation_status,
      warningMessages: rate.warning_messages,
      errorMessages: rate.error_messages,
    };
  });
}

type PackageCode =
  GetRatesWithShipmentDetailsTypes.Result["packages"][0]["packageCode"];

function formatPackages(
  packages: Response.Package[]
): GetRatesWithShipmentDetailsTypes.Result["packages"] {
  return packages.map((pkg) => {
    return {
      packageCode: (pkg.package_code as PackageCode) || null,
      weight: {
        value: pkg.weight.value,
        unit: pkg.weight.unit,
      },
      dimensions: pkg.dimensions
        ? {
            unit: pkg.dimensions.unit,
            length: pkg.dimensions.length,
            width: pkg.dimensions.width,
            height: pkg.dimensions.height,
          }
        : null,
      insuredValue: pkg.insured_value
        ? {
            currency: pkg.insured_value.currency,
            amount: pkg.insured_value.amount,
          }
        : null,
      trackingNumber: pkg.tracking_number || null,
      labelMessages: pkg.label_messages
        ? {
            reference1: pkg.label_messages.reference1,
            reference2: pkg.label_messages.reference2,
            reference3: pkg.label_messages.reference3,
          }
        : null,
      externalPackageId: pkg.external_package_id || null,
    };
  });
}

type BillToAccount =
  GetRatesWithShipmentDetailsTypes.Result["advancedOptions"]["billToAccount"];

type BillToCountryCode =
  GetRatesWithShipmentDetailsTypes.Result["advancedOptions"]["billToCountryCode"];

type Currency = NonNullable<
  NonNullable<
    GetRatesWithShipmentDetailsTypes.Result["advancedOptions"]["collectOnDelivery"]
  >["paymentAmount"]
>["currency"];

function formatAdvancedOptions(
  options: Response.AdvancedShipmentOptions
): GetRatesWithShipmentDetailsTypes.Result["advancedOptions"] {
  const advancedOptions: GetRatesWithShipmentDetailsTypes.Result["advancedOptions"] =
    {
      billToAccount: (options.bill_to_account as BillToAccount) || null,
      billToCountryCode:
        (options.bill_to_country_code as BillToCountryCode) || null,
      billToParty: options.bill_to_party || null,
      billToPostalCode: options.bill_to_postal_code || null,
      containsAlcohol: options.contains_alcohol || null,
      deliveryDutyPaid: options.delivered_duty_paid || null,
      dryIce: options.dry_ice || null,
      dryIceWeight: options.dry_ice_weight
        ? {
            value: options.dry_ice_weight.value,
            unit: options.dry_ice_weight.unit,
          }
        : null,
      nonMachinable: options.non_machinable || null,
      saturdayDelivery: options.saturday_delivery || null,
      useUPSGroundFreightPricing:
        options.use_ups_ground_freight_pricing || null,
      freightClass: options.freight_class || null,
      customField1: options.custom_field1 || null,
      customField2: options.custom_field2 || null,
      customField3: options.custom_field3 || null,
      originType: options.origin_type || null,
      shipperRelease: options.shipper_release || null,
      collectOnDelivery: null,
    };

  if (options.collect_on_delivery) {
    advancedOptions.collectOnDelivery = {
      paymentType: options.collect_on_delivery.payment_type || null,
      paymentAmount: options.collect_on_delivery.payment_amount
        ? {
            currency:
              (options.collect_on_delivery.payment_amount
                .currency as Currency) || null,
            amount: options.collect_on_delivery.payment_amount.amount || null,
          }
        : null,
    };
  }

  return advancedOptions;
}

function formatShippingAddress(
  address: Response.Address
): GetRatesWithShipmentDetailsTypes.Result["returnTo"] {
  return {
    name: address.name!, // Error in generated types
    phone: address.phone!, // Error in generated types
    companyName: address.company_name || null,
    addressLine1: address.address_line1!, // Error in generated types
    addressLine2: address.address_line2 || null,
    addressLine3: address.address_line3 || null,
    cityLocality: address.city_locality!, // Error in generated types
    stateProvince: address.state_province!, // Error in generated types
    postalCode: address.postal_code!, // Error in generated types
    countryCode: address.country_code!, // Error in generated types
    addressResidentialIndicator: address.address_residential_indicator!, // Error in generated types
  };
}

function formatCustoms(
  customs: Response.InternationalShipmentOptions
): GetRatesWithShipmentDetailsTypes.Result["customs"] | null {
  if (!customs) return null;

  return {
    contents: customs.contents,
    nonDelivery: customs.non_delivery,
    customsItems: customs.customs_items
      ? formatCustomsItems(customs.customs_items)
      : null,
  };
}

type CustomsItemResult = NonNullable<
  NonNullable<
    GetRatesWithShipmentDetailsTypes.Result["customs"]
  >["customsItems"]
>;
type CustomsItemCountry = NonNullable<CustomsItemResult[0]["countryOfOrigin"]>;

function formatCustomsItems(items: Response.CustomsItem[]): CustomsItemResult {
  return items.map((item) => {
    return {
      customsItemId: item.customs_item_id,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      description: item.description! || null, //Error in generated types
      quantity: item.quantity || null,
      value: item.value
        ? { currency: item.value.currency, amount: item.value.amount }
        : null,
      harmonizedTariffCode: item.harmonized_tariff_code || null,
      countryOfOrigin: (item.country_of_origin as CustomsItemCountry) || null,
      unitOfMeasure: item.unit_of_measure || null,
      sku: item.sku || null,
      skuDescription: item.sku_description || null,
    };
  });
}

function formatShipmentItems(
  items: Response.ShipmentItem[] | undefined
): GetRatesWithShipmentDetailsTypes.Result["items"] {
  if (!items) {
    return null;
  }
  return items.map((item) => {
    return {
      name: item.name || null,
      salesOrderId: item.sales_order_id || null,
      salesOrderItemId: item.sales_order_item_id || null,
      quantity: item.quantity || null,
      sku: item.sku || null,
      externalOrderId: item.external_order_id || null,
      externalOrderItemId: item.external_order_item_id || null,
      asin: item.asin || null,
      orderSourceCode: item.order_source_code || null,
    };
  });
}

function formatTaxIdentifiers(
  identifiers: Response.TaxIdentifier[] | undefined
): GetRatesWithShipmentDetailsTypes.Result["taxIdentifiers"] {
  if (!identifiers) {
    return null;
  }
  return identifiers.map((identifier) => {
    return {
      taxableEntityType: identifier.taxable_entity_type,
      identifierType: identifier.identifier_type,
      issuingAuthority: identifier.issuing_authority,
      value: identifier.value,
    };
  });
}
