import { AbortController, fetch, getUserAgentString } from "../isomorphic.node";
import { ErrorCode, ErrorSource, ErrorType } from "../enums";
import { NormalizedConfig } from "../config";
import { ShipEngineError, RateLimitExceededError } from "../errors";

export async function get<TResult>(
  endpoint: string,
  config: NormalizedConfig
): Promise<TResult> {
  return await sendRequest(endpoint, "GET", undefined, config);
}

export async function post<TParams, TResult>(
  endpoint: string,
  body: TParams,
  config: NormalizedConfig
): Promise<TResult> {
  return await sendRequest(endpoint, "POST", body, config);
}

export async function put<TParams, TResult>(
  endpoint: string,
  body: TParams,
  config: NormalizedConfig
): Promise<TResult> {
  return await sendRequest(endpoint, "PUT", body, config);
}

export async function destroy<TResult>(
  endpoint: string,
  config: NormalizedConfig
): Promise<TResult> {
  return await sendRequest(endpoint, "DELETE", undefined, config);
}

async function sendRequest<TParams, TResult>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body: TParams | undefined,
  config: NormalizedConfig
  // @ts-expect-error TypeScript is confused by the return in the for loop
): Promise<TResult> {
  // Create an AbortController so we can cancel the request if it times out
  const controller = new AbortController();

  setTimeout(() => controller.abort(), config.timeout);

  const urlWithPath = new URL(endpoint, config.baseURL.toString());

  // Retry up to N times
  for (let retry = 0; retry <= config.retries; retry++) {
    try {
      const response = await fetch(urlWithPath.toString(), {
        body: body ? JSON.stringify(body) : undefined,
        method: method,
        mode: "cors" as const,
        signal: controller.signal,
        headers: buildHeaders(config),
      });

      const responseBody = await response.json();

      if (response.status === 429) {
        throw new RateLimitExceededError(
          responseBody.request_id,
          ErrorSource.ShipEngine,
          Number(response.headers.get("Retry-After")) || 0
        );
      }

      // TODO
      // if (response.status === 400) {
      //   throw new ShipEngineError(
      //     responseBody.request_id,,
      //     response.error.data.source,
      //     response.error.data.type,
      //     response.error.data.code,
      //     response.error.message
      //   );
      // }

      return responseBody;
    } catch (error) {
      if (
        retry < config.retries &&
        error instanceof RateLimitExceededError &&
        error.retryAfter < config.timeout
      ) {
        // The request was blocked due to exceeding the rate limit.
        // So wait the specified amount of time and then retry.
        await wait(error.retryAfter);
      } else if (error.type === "aborted") {
        // The request timed out
        throw new ShipEngineError(
          ErrorType.System,
          ErrorCode.Timeout,
          `The ShipEngine ${endpoint} API timed out.`
        );
      } else {
        // Something unexpected happened, like a network error.
        // No response was received from the server
        throw new ShipEngineError(
          ErrorType.System,
          ErrorCode.Unspecified,
          `An unknown error occurred while calling the ShipEngine ${endpoint} API:\n` +
            (error as Error).message
        );
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

const userAgent = getUserAgentString();

/**
 * Builds request headers
 */
const buildHeaders = (config: NormalizedConfig) => {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    "API-Key": config.apiKey,
    "User-Agent": userAgent,
  };
};
