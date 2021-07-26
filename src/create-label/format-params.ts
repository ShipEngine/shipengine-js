import { Request } from "./types/private";

import { CreateLabelTypes } from ".";

export function formatParams(
  params: CreateLabelTypes.Params
): Request.CreateLabelRequestBody {
  return {
    shipment: params.shipment,
    is_return_label: params.is_return_label,
    rma_number: params.rma_number,
    charge_event: params.charge_event,
    outbound_label_id: params.outbound_label_id,
    test_label: params.test_label,
    validate_address: params.validate_address,
    label_download_type: params.label_download_type,
    label_format: params.label_format,
    display_scheme: params.display_scheme,
    label_layout: params.label_layout,
    label_image_id: params.label_image_id,
  };
}
