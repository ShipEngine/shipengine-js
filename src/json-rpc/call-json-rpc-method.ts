import { NormalizedConfig } from "../config";
import { RateLimitExceededError } from "../errors";
import { processResponse } from "./process-response";
import { sendRequest } from "./send-request";

/**
 * Sends a JSON RPC 2.0 request to ShipEngine API. If the response is successful,
 * the result is returned. Otherwise, an error is thrown.
 */
export async function callJsonRpcMethod<TParams, TResult>(
  method: string,
  params: TParams,
  config: NormalizedConfig
): Promise<TResult> {
  let result: TResult;

  // Determine how many attempts to make
  let attemptNumber = 1;
  const maxAttempts = 1 + config.retries;

  while (attemptNumber <= maxAttempts) {
    try {
      const response = await sendRequest(method, params, config);
      result = await processResponse(response);
    } catch (error: unknown) {
      if (
        attemptNumber < maxAttempts &&
        error instanceof RateLimitExceededError &&
        error.retryAfter < config.timeout
      ) {
        // The request was blocked due to exceeding the rate limit.
        // So wait the specified amount of time and then retry.
        await wait(error.retryAfter);
        attemptNumber++;
      } else {
        throw error;
      }
    }
  }

  // NOTE: The non-null assertion is required because TypeScript can't tell
  // that result will always have a value at this point
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return result!;
}

/**
 * Waits for the specified duration (in milliseconds)
 */
async function wait(duration: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, duration));
}
