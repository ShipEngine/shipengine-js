import { ErrorSource } from "../constants";
import { ShipEngineError } from "./shipengine-error";
/**
 * This error occurs when a request to ShipEngine API is blocked due to the
 * rate limit being exceeded.
 */
export declare class RateLimitExceededError extends ShipEngineError {
    /**
     * The amount of time (in milliseconds) to wait before retrying the request.
     */
    readonly retryAfter: number;
    /**
     * Instantiates a server-side error.
     */
    constructor(requestID: string, source: ErrorSource, retryAfter: number);
}
