import { Response } from "./types/private";

import { CreateLabelTypes } from ".";

export function formatResponse(
  params: Response.CreateLabelResponseBody
): CreateLabelTypes.PublicResponse.Response {
  return {
    labelId: params.label_id,
    status: params.status,
    shipmentId: params.shipment_id,
    shipDate: params.ship_date,
    createdAt: params.created_at,
    shipmentCost: params.shipment_cost,
    insuranceCost: params.insurance_cost,
    trackingNumber: params.tracking_number,
    isReturnLabel: params.is_return_label,
    rmaNumber: params.rma_number,
    isInternational: params.is_international,
    batchId: params.batch_id,
    carrierId: params.carrier_id,
    chargeEvent: params.charge_event,
    serviceCode: params.service_code,
    packageCode: params.package_code,
    voided: params.voided,
    voidedAt: params.voided_at,
    labelFormat: params.label_format,
    displayScheme: params.display_scheme,
    labelLayout: params.label_layout,
    trackable: params.trackable,
    labelImageId: params.label_image_id,
    carrierCode: params.carrier_code,
    trackingStatus: params.tracking_status,
    labelDownload: params.label_download,
    formDownload: params.form_download,
    insuranceClaim: params.insurance_claim,
    packages: mapPackages(params.packages),
  };
}

function mapPackages(
  params: Response.Package[] | undefined
): CreateLabelTypes.PublicResponse.Package[] | undefined {
  if (!params) return undefined;
  return params.map((pkg) => ({
    packageCode: pkg.package_code,
    trackingNumber: pkg.tracking_number,
    weight: pkg.weight,
    dimensions: pkg.dimensions,
    insuredValue: pkg.insured_value,
    labelMessages: pkg.label_messages,
    externalPackageId: pkg.external_package_id,
  }));
}
