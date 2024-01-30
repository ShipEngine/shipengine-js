import { ShipEngineError } from "./shipengine-error";
/**
 * This error occurs when a request to ShipEngine API is blocked due to the
 * rate limit being exceeded.
 */
export class RateLimitExceededError extends ShipEngineError {
    /**
     * Instantiates a server-side error.
     */
    constructor(requestID, source, retryAfter) {
        super(requestID, source, "system", "rate_limit_exceeded", `You have exceeded the rate limit.`, "https://www.shipengine.com/docs/rate-limits");
        this.retryAfter = retryAfter;
    }
}
//# sourceMappingURL=rate-limit-exceeded-error.js.map