import { GetRatesTypes } from ".";
import { Country } from "..";
import { Response } from "./types/private";
import { OrderSourceCode } from "./types/public-params";

// TODO: update types to allow null/undefined

export function formatResponse(
  response: Response.CalculateRatesResponseBody
): GetRatesTypes.GetRatesResult {
  return {
    shipmentId: response.shipment_id || "",
    carrierId: response.carrier_id || "",
    serviceCode: response.service_code || "",
    externalOrderId: response.external_order_id || "",
    items: response.items ? response.items.map(formatShipmentItem) : [],
    taxIdentifiers: response.tax_identifiers
      ? response.tax_identifiers.map(formatTaxIdentifier)
      : [],
    externalShipmentId: response.external_shipment_id || "",
    shipDate: response.ship_date || "",
    shipTo: response.ship_to || "",
    shipFrom: response.ship_from || "",
    warehouseId: response.warehouse_id || "",
    returnTo: response.return_to || "",
    confirmation: response.confirmation || "",
    
  };
}

function formatShipmentItem(
  item: Response.ShipmentItem
): GetRatesTypes.ShipmentItem {
  return {
    name: item.name || "",
    salesOrderId: item.sales_order_id || "",
    salesOrderItemId: item.sales_order_item_id || "",
    quantity: item.quantity || undefined,
    sku: item.sku || "",
    externalOrderId: item.external_order_id || "",
    externalOrderItemId: item.external_order_item_id || "",
    asin: item.asin || "",
    orderSourceCode: (item.order_source_code as OrderSourceCode) || undefined,
  };
}

function formatTaxIdentifier(
  identifier: Response.TaxIdentifier
): GetRatesTypes.TaxIdentifier {
  return {
    taxableEntityType: identifier.taxable_entity_type || "",
    identifierType: identifier.identifier_type || "",
    issuingAuthority: identifier.issuing_authority || "",
    value: identifier.value || "",
  };
}
