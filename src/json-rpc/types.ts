import {
  Country,
  ErrorCode,
  ErrorSource,
  ErrorType,
  ValidationMessageCode,
  ValidationMessageType,
} from "../enums";
import { Url } from "url";

import {
  Country,
  ErrorCode,
  ErrorSource,
  ErrorType,
  CarrierCode,
} from "../enums";

/**
 * A JSON RPC 2.0 response from ShipEngine API, which may be a successful or
 * error response.
 */
export type JsonRpcResponse<TResult> =
  | JsonRpcSuccessResponse<TResult>
  | JsonRpcErrorResponse;

/**
 * A JSON RPC 2.0 successful response from ShipEngine API
 */
export interface JsonRpcSuccessResponse<TResult> {
  jsonrpc: "2.0";
  id: string;
  result: TResult;
}

/**
 * A JSON RPC 2.0 error response from ShipEngine API
 */
export interface JsonRpcErrorResponse {
  jsonrpc: "2.0";
  id: string;
  error: JsonRpcError;
}

/**
 * A JSON RPC 2.0 error from ShipEngine API
 */
export interface JsonRpcError {
  code: number;
  message: string;
  data: ErrorDataDTO;
}

/**
 * ShipEngine-specific error data
 */
export interface ErrorDataDTO {
  source: ErrorSource;
  type: ErrorType;
  code: ErrorCode;
  url?: string;
}

/**
 * Error data for a rate_limit_exceeded error
 */
export interface RateLimitExceededErrorDataDTO extends ErrorDataDTO {
  code: ErrorCode.RateLimitExceeded;
  retryAfter: number;
}

/**
 * The params that are passed to the ShipEngine address validation API.
 */
export interface AddressValidateParamsDTO {
  address: {
    name?: string;
    company?: string;
    phone?: string;
    street: string[];
    cityLocality?: string;
    stateProvince?: string;
    postalCode?: string;
    countryCode: Country;
    isResidential?: boolean | null;
  };
}

/**
 * The result that comes back from the ShipEngine address validation API.
 */
export interface AddressValidateResultDTO {
  isValid: boolean;
  normalizedAddress?: {
    name?: string;
    company?: string;
    phone?: string;
    street: string[];
    cityLocality: string;
    stateProvince: string;
    postalCode: string;
    countryCode: Country;
    isResidential: boolean | null;
  };
  messages: AddressValidationMessageDTO[];
}

export interface AddressValidationMessageDTO {
  type: ValidationMessageType;
  code: ValidationMessageCode;
  message: string;
}

export interface TrackPackageByTrackingNumberRPCParams {
  carrierCode: CarrierCode;
  trackingNumber: string;
}

/**
 * The result that comes back from the ShipEngine track package API.
 */
export interface TrackPackageByTrackingNumberRpcResult {
  shipment: {
    carrier_code: string;
    estimated_delivery_date: string;
    carrier_id?: string;
    shipment_id?: string;
  };
  package: {
    package_id?: string;
    tracking_number: string;
    tracking_url?: Url;
    weight?: {
      value: number;
      unit: string;
    };
    dimensions?: {
      length: number;
      width: number;
      height: number;
      unit: string;
    };
  };
  events: [
    {
      date_time: string;
      carrier_date_time: string;
      status: string;
      description: string;
      carrier_status_code: string;
      signer?: string;
      carrier_detail_code?: string;
      location?: {
        state_province?: string;
        coordinates?: {
          latitude?: number;
          longitude?: number;
        };
        postal_code?: string;
        city_locality?: string;
        country_code?: string;
      };
    }
  ];
}
