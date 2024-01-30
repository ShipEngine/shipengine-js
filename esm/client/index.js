import { AbortController, getUserAgentString } from "../isomorphic.node";
import { ShipEngineError, RateLimitExceededError } from "../errors";
import { handle400Errors } from "./handle-400-errors";
import { handle404Errors } from "./handle-404-errors";
import { handle500Errors } from "./handle-500-errors";
export async function get(endpoint, config) {
    return await sendRequestWithRetry(endpoint, "GET", undefined, config);
}
export async function post(endpoint, body, config) {
    return await sendRequestWithRetry(endpoint, "POST", body, config);
}
export async function put(endpoint, body, config) {
    return await sendRequestWithRetry(endpoint, "PUT", body, config);
}
export async function destroy(endpoint, config) {
    return await sendRequestWithRetry(endpoint, "DELETE", undefined, config);
}
async function sendRequestWithRetry(endpoint, method, body, config
// @ts-expect-error TypeScript is confused by the return in the for loop
) {
    const urlWithPath = new URL(endpoint, config.baseURL.toString());
    // Retry up to N times
    for (let retry = 0; retry <= config.retries; retry++) {
        try {
            return await sendRequest(urlWithPath, method, body, config);
        }
        catch (error) {
            if (retry < config.retries &&
                error instanceof RateLimitExceededError &&
                error.retryAfter < config.timeout) {
                // The request was blocked due to exceeding the rate limit.
                // So wait the specified amount of time and then retry.
                await wait(error.retryAfter);
            }
            else if (error.name === "AbortError") {
                // The request timed out
                throw new ShipEngineError("system", "timeout", `The ShipEngine ${endpoint} API timed out.`);
            }
            else {
                // Re-throw errors that were thrown from within sendRequest
                throw error;
            }
        }
    }
}
async function sendRequest(url, method, body, config) {
    // Create an AbortController so we can cancel the request if it times out
    const controller = new AbortController();
    setTimeout(() => controller.abort(), config.timeout);
    const response = await fetch(url.toString(), {
        body: body ? JSON.stringify(body) : undefined,
        method: method,
        mode: "cors",
        signal: controller.signal,
        headers: buildHeaders(config),
    });
    const responseBody = await response.json();
    if (response.status === 429) {
        throw new RateLimitExceededError(responseBody.request_id, "shipengine", Number(response.headers.get("Retry-After")) || 0);
    }
    if (response.status === 400)
        handle400Errors(responseBody);
    if (response.status === 404)
        handle404Errors(responseBody);
    if (response.status === 500)
        handle500Errors();
    return responseBody;
}
/**
 * Waits for the specified duration (in milliseconds)
 */
async function wait(duration) {
    await new Promise((resolve) => setTimeout(resolve, duration));
}
const userAgent = getUserAgentString();
/**
 * Builds request headers
 */
const buildHeaders = ({ apiKey, onBehalfOf }) => {
    const headers = {
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
//# sourceMappingURL=index.js.map