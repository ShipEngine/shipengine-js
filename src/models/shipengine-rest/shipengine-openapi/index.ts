import { Overwrite } from 'utility-types';
import { Compute, GetArrayElement } from '../../../utils/ts';
import type {
  AddressValidationResult as _AddressValidationResult,
  PartialAddress as _PartialAddress,
  PartialAddress1 as _PartialAddress1,
  ResponseMessage as _ResponseMessage,
} from './validate_address_response_body';

import type {
  ValidateAddressRequestBody as _ValidateAddressRequestBody,
  AddressToValidate as _AddressToValidate,
} from './validate_address_request_body';

export type ValidateAddressRequestBody = _ValidateAddressRequestBody;

export type AddressToValidate = _AddressToValidate;

export type ResponseMessage = _ResponseMessage;

export type ValidateAddressResponseBody = AddressValidationResult[];

export type MatchedAddress = _PartialAddress1 | _PartialAddress;

export type AddressValidationResult = Overwrite<
  _AddressValidationResult,
  { matched_address: MatchedAddress | null }
>;

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

export type GetTrackingLogResponseBody = Compute<
  Overwrite<
    _GetTrackingLogResponseBody,
    {
      events: TrackEventInternal[];
    }
  >
>;

import type { GetTrackingLogFromLabelResponseBody as _GetTrackingLogFromLabelResponseBody } from './get_tracking_log_from_label_response_body';

export type GetTrackingLogFromLabelResponseBody = Compute<
  Overwrite<
    _GetTrackingLogFromLabelResponseBody,
    {
      events: TrackEventInternal[];
    }
  >
>;
