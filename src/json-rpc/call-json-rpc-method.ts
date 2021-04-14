import { EventEmitter } from "../isomorphic.node";
import { NormalizedConfig } from "../config";
import { RateLimitExceededError } from "../errors";
import { sendRequest } from "./send-request";

/**
 * Sends a JSON RPC 2.0 request to ShipEngine API. If the response is successful,
 * the result is returned. Otherwise, an error is thrown.
 */
export async function callJsonRpcMethod<TParams, TResult>(
  method: string,
  params: TParams,
  config: NormalizedConfig,
  events: EventEmitter
  // @ts-expect-error TypeScript is confused by the return in the for loop
): Promise<TResult> {
  // Retry up to N times
  for (let retry = 0; retry <= config.retries; retry++) {
    try {
      return await sendRequest(method, params, retry, config, events);
    } catch (error: unknown) {
      if (
        retry < config.retries &&
        error instanceof RateLimitExceededError &&
        error.retryAfter < config.timeout
      ) {
        // The request was blocked due to exceeding the rate limit.
        // So wait the specified amount of time and then retry.
        await wait(error.retryAfter);
      } else {
        throw error;
      }
    }
  }
}

/**
 * Waits for the specified duration (in milliseconds)
 */
async function wait(duration: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, duration));
}
