import type { GetArrayElement, Overwrite } from '../../../../utils/ts';
import type { GetTrackingLogResponseBody as _GetTrackingLogResponseBody } from './get_tracking_log_response_body';

export type TrackEventInternal = GetArrayElement<
  _GetTrackingLogResponseBody['events']
> & {
  // hacky overwrite of tracking stuff
  carrier_detail_code: string;
  carrier_status_code: string;
  carrier_status_description: string;
  exception_description?: string;
  status_code: 'AC' | 'AT' | 'DE' | 'EX' | 'IT' | 'NY' | 'UN';
  status_description: string;
};

export type GetTrackingLogResponseBody = Overwrite<
  _GetTrackingLogResponseBody,
  {
    events: TrackEventInternal[];
  }
>;

import type { GetTrackingLogFromLabelResponseBody as _GetTrackingLogFromLabelResponseBody } from './get_tracking_log_from_label_response_body';

export type GetTrackingLogFromLabelResponseBody = Overwrite<
  _GetTrackingLogFromLabelResponseBody,
  {
    events: TrackEventInternal[];
  }
>;
