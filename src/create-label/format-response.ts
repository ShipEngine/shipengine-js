import { Response } from "./types/private";

import { CreateLabelTypes } from ".";

export function formatResponse(
  params: Response.CreateLabelResponseBody
): CreateLabelTypes.Response {
  return {
    label_id: params.label_id,
    status: params.status,
    shipment_id: params.shipment_id,
    ship_date: params.ship_date,
    created_at: params.created_at,
    shipment_cost: params.shipment_cost,
    insurance_cost: params.insurance_cost,
    tracking_number: params.tracking_number,
    is_return_label: params.is_return_label,
    rma_number: params.rma_number,
    is_international: params.is_international,
    batch_id: params.batch_id,
    carrier_id: params.carrier_id,
    charge_event: params.charge_event,
    service_code: params.service_code,
    package_code: params.package_code,
    voided: params.voided,
    voided_at: params.voided_at,
    label_format: params.label_format,
    display_scheme: params.display_scheme,
    label_layout: params.label_layout,
    trackable: params.trackable,
    label_image_id: params.label_image_id,
    carrier_code: params.carrier_code,
    tracking_status: params.tracking_status,
    label_download: params.label_download,
    form_download: params.form_download,
    insurance_claim: params.insurance_claim,
    packages: params.packages,
  };
}
