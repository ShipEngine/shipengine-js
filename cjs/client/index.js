"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroy = exports.put = exports.post = exports.get = void 0;
const isomorphic_node_1 = require("../isomorphic.node");
const errors_1 = require("../errors");
const handle_400_errors_1 = require("./handle-400-errors");
const handle_404_errors_1 = require("./handle-404-errors");
const handle_500_errors_1 = require("./handle-500-errors");
async function get(endpoint, config) {
    return await sendRequestWithRetry(endpoint, "GET", undefined, config);
}
exports.get = get;
async function post(endpoint, body, config) {
    return await sendRequestWithRetry(endpoint, "POST", body, config);
}
exports.post = post;
async function put(endpoint, body, config) {
    return await sendRequestWithRetry(endpoint, "PUT", body, config);
}
exports.put = put;
async function destroy(endpoint, config) {
    return await sendRequestWithRetry(endpoint, "DELETE", undefined, config);
}
exports.destroy = destroy;
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
                error instanceof errors_1.RateLimitExceededError &&
                error.retryAfter < config.timeout) {
                // The request was blocked due to exceeding the rate limit.
                // So wait the specified amount of time and then retry.
                await wait(error.retryAfter);
            }
            else if (error.name === "AbortError") {
                // The request timed out
                throw new errors_1.ShipEngineError("system", "timeout", `The ShipEngine ${endpoint} API timed out.`);
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
    const controller = new isomorphic_node_1.AbortController();
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
        throw new errors_1.RateLimitExceededError(responseBody.request_id, "shipengine", Number(response.headers.get("Retry-After")) || 0);
    }
    if (response.status === 400)
        handle_400_errors_1.handle400Errors(responseBody);
    if (response.status === 404)
        handle_404_errors_1.handle404Errors(responseBody);
    if (response.status === 500)
        handle_500_errors_1.handle500Errors();
    return responseBody;
}
/**
 * Waits for the specified duration (in milliseconds)
 */
async function wait(duration) {
    await new Promise((resolve) => setTimeout(resolve, duration));
}
const userAgent = isomorphic_node_1.getUserAgentString();
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