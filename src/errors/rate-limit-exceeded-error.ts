import { ErrorSource } from "../constants";
import { ShipEngineError } from "./shipengine-error";

/**
 * This error occurs when a request to ShipEngine API is blocked due to the
 * rate limit being exceeded.
 */
export class RateLimitExceededError extends ShipEngineError {
  /**
   * The amount of time (in milliseconds) to wait before retrying the request.
   */
  public readonly retryAfter: number;

  /**
   * Instantiates a server-side error.
   */
  public constructor(
    requestID: string,
    source: ErrorSource,
    retryAfter: number
  ) {
    super(
      requestID,
      source,
      "system",
      "rate_limit_exceeded",
      `You have exceeded the rate limit.`,
      "https://www.shipengine.com/docs/rate-limits"
    );

    this.retryAfter = retryAfter;
  }
}
