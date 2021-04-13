import { NormalizedConfig } from "../config";
import { ErrorCode, ErrorSource, ErrorType } from "../enums";
import { ShipEngineError } from "../errors";
import { Event, RequestSentEvent } from "../events";
import {
  AbortController,
  EventEmitter,
  fetch,
  getUserAgentString,
} from "../isomorphic.node";
import { processResponse } from "./process-response";

const userAgent = getUserAgentString();

/**
 * Sends a JSON RPC 2.0 request to ShipEngine API. The request is automatically
 * canceled if it exceeds the configured timeout.
 */
export async function sendRequest<TParams, TResult>(
  method: string,
  params: TParams,
  retry: number,
  config: NormalizedConfig,
  events: EventEmitter
): Promise<TResult> {
  // Generate a unique request ID using the timestamp and a random number
  const randomNumber = Math.floor(Math.random() * 1000);
  const requestID = `req_${Date.now()}${randomNumber}`;

  // Create an AbortController so we can cancel the request if it times out
  const controller = new AbortController();
  setTimeout(() => controller.abort(), config.timeout);

  const headers = {
    "Content-Type": "application/json",
    "API-Key": config.apiKey,
    "User-Agent": userAgent,
  };

  const body = {
    jsonrpc: "2.0",
    method,
    id: requestID,
    params,
  };

  // Emit the RequestSent event
  const request: RequestSentEvent = {
    timestamp: new Date(),
    type: Event.RequestSent,
    message: `Calling the ShipEngine ${method} API at ${config.baseURL.href}`,
    requestID,
    url: config.baseURL,
    headers,
    body,
    retry,
    timeout: config.timeout,
  };
  events.emit(Event.RequestSent, request);

  try {
    // Send the JSON RPC 2.0 request
    const response = await fetch(config.baseURL.href, {
      method: "POST",
      mode: "cors" as const,
      signal: controller.signal,
      headers,
      body: JSON.stringify(body),
    });

    return processResponse(method, request, response, config, events);
  } catch (error: unknown) {
    // Something unexpected happened, like a network error.
    // No response was received from the server

    throw new ShipEngineError(
      requestID,
      ErrorSource.ShipEngine,
      ErrorType.System,
      ErrorCode.Unspecified,
      `An unknown error occurred while calling the ShipEngine ${method} API:\n` +
        (error as Error).message
    );
  }
}
