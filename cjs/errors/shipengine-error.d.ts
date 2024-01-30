import { ErrorCode, ErrorSource, ErrorType } from "../constants";
/**
 * An error thrown by the ShipEngine SDK.
 * All other SDK errors inherit from this class.
 */
export declare class ShipEngineError extends Error {
    /**
     * If the error came from the ShipEngine server (as opposed to a client-side error)
     * then this is the unique ID of the HTTP request that returned the error.
     * You can use this ID when contacting ShipEngine support for help.
     */
    readonly requestID?: string;
    /**
     * Indicates where the error originated. This lets you know whether you should
     * contact ShipEngine for support or if you should contact the carrier or
     * marketplace instead.
     *
     * @see https://www.shipengine.com/docs/errors/codes/#error-source
     */
    readonly source: ErrorSource;
    /**
     * Indicates the type of error that occurred, such as a validation error, a
     * security error, etc.
     *
     * @see https://www.shipengine.com/docs/errors/codes/#error-type
     */
    readonly type: ErrorType;
    /**
     * A code that indicates the specific error that occurred, such as missing a
     * required field, an invalid address, a timeout, etc.
     *
     * @see https://www.shipengine.com/docs/errors/codes/#error-code
     */
    readonly code: ErrorCode;
    /**
     * Some errors include a URL that you can visit to learn more about the error,
     * find out how to resolve it, or get support.
     */
    readonly url: URL;
    /**
     * Instantiates a client-side error.
     */
    constructor(type: ErrorType, code: ErrorCode, message: string);
    /**
     * Instantiates a client-side error with a URL.
     */
    constructor(type: ErrorType, code: ErrorCode, message: string, url: string);
    /**
     * Instantiates a server-side error.
     */
    constructor(requestID: string | undefined, source: ErrorSource, type: ErrorType, code: ErrorCode, message: string, url?: string);
    /**
     * Converts the error object to a POJO that can easily be logged or serialized.
     */
    toJSON(): Readonly<ShipEngineError>;
}
