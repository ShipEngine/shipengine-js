import { NormalizedConfig } from "../config";
import { ErrorCode, ErrorSource, ErrorType } from "../enums";
import { RateLimitExceededError, ShipEngineError } from "../errors";
import { Event, RequestSentEvent, ResponseReceivedEvent } from "../events";
import { EventEmitter } from "../isomorphic.node";
import {
  JsonRpcErrorResponse,
  JsonRpcResponse,
  JsonRpcSuccessResponse,
  RateLimitExceededErrorDataDTO,
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

  if (!isJsonRpcResponse(body)) {
    // The response is not valid JSON RPC 2.0
    throw new ShipEngineError(
      request.requestID,
      ErrorSource.ShipEngine,
      ErrorType.System,
      ErrorCode.Unspecified,
      `The ShipEngine ${method} API returned an invalid response. ` +
        `Please contact ShipEngine support and reference this ID: ${request.requestID}.`,
      "mailto:support@shipengine.com"
    );
  }

  // If it's an error response, then throw a ShipEngineError
  if ("error" in body) {
    const error = createError(body);
    throw error;
  }

  // A successful response was returned
  return body.result;
}

/**
 * Determines whether the response is valid JSON RPC 2.0.
 */
function isJsonRpcResponse<T>(
  response: unknown
): response is JsonRpcResponse<T> {
  const rpcResponse = response as JsonRpcSuccessResponse<T>;

  return Boolean(
    rpcResponse &&
      typeof rpcResponse === "object" &&
      rpcResponse.jsonrpc === "2.0" &&
      rpcResponse.id &&
      typeof rpcResponse.id === "string" &&
      (typeof rpcResponse.result === "object" ||
        isJsonRpcErrorResponse(response))
  );
}

/**
 * Determines whether the response is valid JSON RPC 2.0 error.
 */
function isJsonRpcErrorResponse(
  response: unknown
): response is JsonRpcErrorResponse {
  const rpcResponse = response as JsonRpcErrorResponse;
  const error = rpcResponse.error;

  return Boolean(
    error &&
      typeof error === "object" &&
      typeof error.code === "number" &&
      error.message &&
      typeof error.message === "string" &&
      typeof error.data === "object" &&
      error.data.source &&
      typeof error.data.source === "string" &&
      error.data.type &&
      typeof error.data.type === "string" &&
      error.data.code &&
      typeof error.data.code === "string" &&
      (error.data.url === null ||
        (error.data.url && typeof error.data.url === "string"))
  );
}

/**
 * Creates the appropriate ShipEngineError class, depending on the error code
 */
function createError(response: JsonRpcErrorResponse): ShipEngineError {
  let errorData;

  switch (response.error.data.code) {
    case ErrorCode.RateLimitExceeded:
      errorData = response.error.data as RateLimitExceededErrorDataDTO;
      return new RateLimitExceededError(
        response.id,
        ErrorSource.ShipEngine,
        errorData.details.retryAfter * 1000 // convert seconds to milliseconds
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
