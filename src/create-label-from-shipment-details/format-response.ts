import { Response } from "./types/private";

import { CreateLabelFromShipmentDetailsTypes } from ".";

export function formatResponse(
  params: Response.CreateLabelResponseBody
): CreateLabelFromShipmentDetailsTypes.Result {
  return {
    labelId: params.label_id!, // Error in generated types
    status: params.status!, // Error in generated types
    shipmentId: params.shipment_id!, // Error in generated types
    shipDate: params.ship_date!, // Error in generated types
    createdAt: params.created_at!, // Error in generated types
    shipmentCost: params.shipment_cost!, // Error in generated types
    insuranceCost: params.insurance_cost!, // Error in generated types
    trackingNumber: params.tracking_number!, // Error in generated types
    isReturnLabel: params.is_return_label!, // Error in generated types
    rmaNumber: params.rma_number!, // Error in generated types
    isInternational: params.is_international!, // Error in generated types
    batchId: params.batch_id!, // Error in generated types
    carrierId: params.carrier_id!, // Error in generated types
    chargeEvent: params.charge_event!, // Error in generated types
    serviceCode: params.service_code!, // Error in generated types
    packageCode: params.package_code!, // Error in generated types
    voided: params.voided!, // Error in generated types
    voidedAt: params.voided_at!, // Error in generated types
    labelFormat: params.label_format!, // Error in generated types
    displayScheme: params.display_scheme!, // Error in generated types
    labelLayout: params.label_layout!, // Error in generated types
    trackable: params.trackable!, // Error in generated types
    labelImageId: params.label_image_id!, // Error in generated types
    carrierCode: params.carrier_code!, // Error in generated types
    trackingStatus: params.tracking_status!, // Error in generated types
    labelDownload: mapLabelDownload(params.label_download!), // Error in generated types
    formDownload: mapFormDownload(params.form_download), // Error in generated types
    insuranceClaim: mapInsuranceClaim(params.insurance_claim), // Error in generated types
    packages: mapPackages(params.packages!)!, // Error in generated types
  };
}

function mapLabelDownload(
  params: Response.LabelDownload
): CreateLabelFromShipmentDetailsTypes.Result["labelDownload"] {
  return {
    href: params.href!, // Error in generated types
    pdf: params.pdf!, // Error in generated types
    png: params.png!, // Error in generated types
    zpl: params.zpl!, // Error in generated types
  };
}

function mapFormDownload(
  params: Response.Link | undefined
): CreateLabelFromShipmentDetailsTypes.Result["formDownload"] | null {
  if (!params) return null;
  return {
    href: params.href!, // Error in generated types
    type: params.type!, // Error in generated types
  };
}

function mapInsuranceClaim(
  params: Response.Link | undefined
): CreateLabelFromShipmentDetailsTypes.Result["insuranceClaim"] | null {
  if (!params) return null;
  return {
    href: params.href!, // Error in generated types
    type: params.type!, // Error in generated types
  };
}

function mapPackages(
  params: Response.Package[]
): CreateLabelFromShipmentDetailsTypes.Result["packages"][0][] {
  return params.map((pkg) => ({
    packageCode: pkg.package_code!, // Error in generated types
    trackingNumber: pkg.tracking_number!, // Error in generated types
    weight: pkg.weight!, // Error in generated types
    dimensions: pkg.dimensions!, // Error in generated types
    insuredValue: pkg.insured_value!, // Error in generated types
    labelMessages: pkg.label_messages!, // Error in generated types
    externalPackageId: pkg.external_package_id!, // Error in generated types
  }));
}
