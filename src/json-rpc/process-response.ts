import { ErrorCode, ErrorSource } from "../enums";
import { RateLimitExceededError, ShipEngineError } from "../errors";
import {
  JsonRpcErrorResponse,
  JsonRpcResponse,
  RateLimitExceededErrorData,
} from "./types";

/**
 * Processes a JSON RPC 2.0 response from ShipEngine API. If the response is successful,
 * the result is returned. Otherwise, an error is thrown.
 */
export async function processResponse<TResult>(
  response: Response
): Promise<TResult> {
  // Parse the response body
  const responseBody: JsonRpcResponse<TResult> = await response.json();

  // If it's an error response, then throw a ShipEngineError
  if ("error" in responseBody) {
    const error = createError(responseBody);
    throw error;
  }

  // I
  return responseBody.result;
}

/**
 * Creates the appropriate ShipEngineError class, depending on the error code
 */
function createError(response: JsonRpcErrorResponse): ShipEngineError {
  let errorData;

  switch (response.error.data.code) {
    case ErrorCode.RateLimitExceeded:
      errorData = response.error.data as RateLimitExceededErrorData;
      return new RateLimitExceededError(
        response.id,
        ErrorSource.ShipEngine,
        errorData.retry_after * 1000 // convert seconds to milliseconds
      );

    default:
      return new ShipEngineError(
        response.id,
        response.error.data.source,
        response.error.data.type,
        response.error.data.code,
        response.error.message
      );
  }
}
