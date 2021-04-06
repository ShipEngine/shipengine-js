import { ErrorCode, ErrorSource, ErrorType } from "../enums";

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
