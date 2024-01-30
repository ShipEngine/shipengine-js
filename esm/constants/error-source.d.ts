/**
 * Indicates where an error originated from. This lets you know whether you should
 * contact ShipEngine for support or if you should contact the carrier or
 * marketplace instead.
 *
 * @see https://www.shipengine.com/docs/errors/codes/#error-source
 */
export declare type ErrorSource = "shipengine" | "carrier" | "order_source";
