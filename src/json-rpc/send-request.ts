import { NormalizedConfig } from "../config";
import { ErrorCode, ErrorSource, ErrorType } from "../enums";
import { ShipEngineError } from "../errors";
import { AbortController, fetch } from "../isomorphic.node";

/**
 * Sends a JSON RPC 2.0 request to ShipEngine API. The request is automatically
 * canceled if it exceeds the configured timeout.
 */
export async function sendRequest<TParams>(
  method: string,
  params: TParams,
  config: NormalizedConfig
): Promise<Response> {
  // Generate a unique request ID using the timestamp and a random number
  const randomNumber = Math.floor(Math.random() * 1000);
  const requestID = `req_${Date.now()}${randomNumber}`;

  // Create an AbortController so we can cancel the request if it times out
  const controller = new AbortController();
  setTimeout(() => controller.abort(), config.timeout);

  try {
    // Send the JSON RPC 2.0 request
    const response = await fetch(config.baseURL.href, {
      method: "POST",
      mode: "cors",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        "API-Key": config.apiKey,
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: requestID,
        params,
      }),
    });

    return response;
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
