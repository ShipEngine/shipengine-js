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
  error: ShipEngineError;
}

/**
 * A JSON RPC 2.0 error from ShipEngine API
 */
export interface ShipEngineError {
  code: number;
  message: string;
  data: ShipEngineErrorData;
}

/**
 * ShipEngine-specific error data
 */
export interface ShipEngineErrorData {
  source: ErrorSource;
  type: ErrorType;
  code: ErrorCode;
  url?: string;
}

/**
 * Error data for a rate_limit_exceeded error
 */
export interface RateLimitExceededErrorData extends ShipEngineErrorData {
  code: ErrorCode.RateLimitExceeded;
  retry_after: number;
}

/**
 * The params that are passed to the ShipEngine address validation API.
 */
export interface AddressValidateParams {
  address: {
    name?: string;
    company_name?: string;
    phone?: string;
    street: string[];
    city_locality?: string;
    state_province?: string;
    postal_code?: string;
    country_code: Country;
    residential?: boolean | null;
  };
}

/**
 * The result that comes back from the ShipEngine address validation API.
 */
export interface AddressValidateResult {
  valid: boolean;
  address?: {
    name?: string;
    company_name?: string;
    phone?: string;
    street: string[];
    city_locality: string;
    state_province: string;
    postal_code: string;
    country_code: Country;
    residential: boolean | null;
  };
  messages: {
    info: string[];
    warnings: string[];
    errors: string[];
  };
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
