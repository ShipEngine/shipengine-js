"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimitExceededError = void 0;
const shipengine_error_1 = require("./shipengine-error");
/**
 * This error occurs when a request to ShipEngine API is blocked due to the
 * rate limit being exceeded.
 */
class RateLimitExceededError extends shipengine_error_1.ShipEngineError {
    /**
     * Instantiates a server-side error.
     */
    constructor(requestID, source, retryAfter) {
        super(requestID, source, "system", "rate_limit_exceeded", `You have exceeded the rate limit.`, "https://www.shipengine.com/docs/rate-limits");
        this.retryAfter = retryAfter;
    }
}
exports.RateLimitExceededError = RateLimitExceededError;
//# sourceMappingURL=rate-limit-exceeded-error.js.map