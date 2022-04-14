import { AbortController, getUserAgentString } from "../isomorphic.node";
import { NormalizedConfig } from "../config";
import { ShipEngineError, RateLimitExceededError } from "../errors";
import { handle400Errors } from "./handle-400-errors";
import { handle404Errors } from "./handle-404-errors";
import { handle500Errors } from "./handle-500-errors";

export async function get<TResult>(
  endpoint: string,
  config: NormalizedConfig
): Promise<TResult> {
  return await sendRequestWithRetry(endpoint, "GET", undefined, config);
}

export async function post<TParams, TResult>(
  endpoint: string,
  body: TParams,
  config: NormalizedConfig
): Promise<TResult> {
  return await sendRequestWithRetry(endpoint, "POST", body, config);
}

export async function put<TParams, TResult>(
  endpoint: string,
  body: TParams,
  config: NormalizedConfig
): Promise<TResult> {
  return await sendRequestWithRetry(endpoint, "PUT", body, config);
}

export async function destroy<TResult>(
  endpoint: string,
  config: NormalizedConfig
): Promise<TResult> {
  return await sendRequestWithRetry(endpoint, "DELETE", undefined, config);
}

async function sendRequestWithRetry<TParams, TResult>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body: TParams | undefined,
  config: NormalizedConfig
  // @ts-expect-error TypeScript is confused by the return in the for loop
): Promise<TResult> {
  const urlWithPath = new URL(endpoint, config.baseURL.toString());

  // Retry up to N times
  for (let retry = 0; retry <= config.retries; retry++) {
    try {
      return await sendRequest(urlWithPath, method, body, config);
    } catch (error) {
      if (
        retry < config.retries &&
        error instanceof RateLimitExceededError &&
        error.retryAfter < config.timeout
      ) {
        // The request was blocked due to exceeding the rate limit.
        // So wait the specified amount of time and then retry.
        await wait(error.retryAfter);
      } else if (error.name === "AbortError") {
        // The request timed out
        throw new ShipEngineError(
          "system",
          "timeout",
          `The ShipEngine ${endpoint} API timed out.`
        );
      } else {
        // Re-throw errors that were thrown from within sendRequest
        throw error;
      }
    }
  }
}

async function sendRequest<TParams, TResult>(
  url: URL,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body: TParams | undefined,
  config: NormalizedConfig
): Promise<TResult> {
  // Create an AbortController so we can cancel the request if it times out
  const controller = new AbortController();
  setTimeout(() => controller.abort(), config.timeout);

  const response = await fetch(url.toString(), {
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
      "shipengine",
      Number(response.headers.get("Retry-After")) || 0
    );
  }

  if (response.status === 400) handle400Errors(responseBody);
  if (response.status === 404) handle404Errors(responseBody);
  if (response.status === 500) handle500Errors();

  return responseBody;
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
const buildHeaders = ({ apiKey, onBehalfOf }: NormalizedConfig) => {
  const headers: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "API-Key": apiKey,
    "User-Agent": userAgent,
  };

  if (onBehalfOf) {
    headers["On-Behalf-Of"] = onBehalfOf;
  }

  return headers;
};
