import { NormalizedConfig } from "../config";
import { ErrorCode, ErrorSource } from "../enums";
import { RateLimitExceededError, ShipEngineError } from "../errors";
import { Event, RequestSentEvent, ResponseReceivedEvent } from "../events";
import { EventEmitter } from "../isomorphic.node";
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
  method: string,
  request: RequestSentEvent,
  response: Response,
  config: NormalizedConfig,
  events: EventEmitter
): Promise<TResult> {
  // Read the response headers
  const headers: Record<string, string> = {};
  response.headers.forEach((value, name) => {
    headers[name] = value;
  });

  // Read the response body
  const body: JsonRpcResponse<TResult> = await response.json();

  // Emit the ResponseReceived event
  const event: ResponseReceivedEvent = {
    timestamp: new Date(),
    type: Event.ResponseReceived,
    message: `Received an HTTP ${response.status} response from the ShipEngine ${method} API.`,
    requestID: request.requestID,
    url: config.baseURL,
    statusCode: response.status,
    headers,
    body,
    retry: request.retry,
    elapsed: Date.now() - request.timestamp.getTime(),
  };
  events.emit(Event.ResponseReceived, event);

  // If it's an error response, then throw a ShipEngineError
  if ("error" in body) {
    const error = createError(body);
    throw error;
  }

  // A successful response was returned
  return body.result;
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
