import { Request } from "./types/private";

import { CreateLabelFromRateTypes } from ".";

export function formatParams(
  params: CreateLabelFromRateTypes.Params
): Request.CreateLabelFromRateRequestBody {
  return {
    validate_address: params.validateAddress,
    label_layout: params.labelLayout,
    label_format: params.labelFormat,
    label_download_type: params.labelDownloadType,
    display_scheme: params.displayScheme,
  };
}
