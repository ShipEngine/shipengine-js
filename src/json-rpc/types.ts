import {
  Country,
  ErrorCode,
  ErrorSource,
  ErrorType,
  CarrierCode,
  ValidationMessageCode,
  ValidationMessageType,
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

export interface TrackPackageRPCParams {
  carrierCode?: string;
  trackingNumber?: string;
  packageId?: string;
}

/**
 * The result that comes back from the ShipEngine track package API.
 */
export interface TrackPackageDTO {
  shipment: {
    carrierCode: string;
    carrierAccountId: string;
    shipmentId?: string;
    estimatedDelivery: string;
  };
  package: {
    packageId?: string;
    trackingNumber: string;
    trackingURL?: string;
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
  events: EventDTO[];
}

export interface EventDTO {
  timestamp: string;
  carrierTimeStamp: string;
  status: string;
  description: string;
  carrierStatusCode: string;
  carrierDetailCode?: string;
  signer?: string;
  location?: {
    stateProvince?: string;
    postalCode?: string;
    cityLocality?: string;
    countryCode?: string;
    coordinates?: {
      latitude?: number;
      longitude?: number;
    };
  };
}

export interface CarriersDTO {
  accountId: string;
  carrierCode: string;
  accountNumber: string;
  name: string;
}

/**
 * The result that comes back from the ShipEngine list carriers API.
 */
export interface CarriersDTOResult {
  carrierAccounts: CarriersDTO[];
}
