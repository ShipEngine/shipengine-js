import type { GetArrayElement, Overwrite } from '../../../../utils/ts';

import type { GetTrackingLogResponseBody as _GetTrackingLogResponseBody } from './get_tracking_log_response_body';

export type TrackEventInternal = GetArrayElement<
  _GetTrackingLogResponseBody['events']
> & {
  // hacky overwrite of tracking stuff
  carrier_detail_code: string; // TODO: This shows up null in the hoverfly response, and is nowherre
  carrier_status_code: GetTrackingLogResponseBody['carrier_status_code']; // e.g. AR or OD or DP
  status_code?: GetTrackingLogResponseBody['status_code']; // e.g. IT
  status_description: GetTrackingLogResponseBody['status_description']; // e.g. In Transit
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
