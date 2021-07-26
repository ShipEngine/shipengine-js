import { ErrorCode, ErrorSource, ErrorType } from "../constants";

/**
 * An error thrown by the ShipEngine SDK.
 * All other SDK errors inherit from this class.
 */
export class ShipEngineError extends Error {
  /**
   * If the error came from the ShipEngine server (as opposed to a client-side error)
   * then this is the unique ID of the HTTP request that returned the error.
   * You can use this ID when contacting ShipEngine support for help.
   */
  public readonly requestID?: string;

  /**
   * Indicates where the error originated. This lets you know whether you should
   * contact ShipEngine for support or if you should contact the carrier or
   * marketplace instead.
   *
   * @see https://www.shipengine.com/docs/errors/codes/#error-source
   */
  public readonly source: ErrorSource;

  /**
   * Indicates the type of error that occurred, such as a validation error, a
   * security error, etc.
   *
   * @see https://www.shipengine.com/docs/errors/codes/#error-type
   */
  public readonly type: ErrorType;

  /**
   * A code that indicates the specific error that occurred, such as missing a
   * required field, an invalid address, a timeout, etc.
   *
   * @see https://www.shipengine.com/docs/errors/codes/#error-code
   */
  public readonly code: ErrorCode;

  /**
   * Some errors include a URL that you can visit to learn more about the error,
   * find out how to resolve it, or get support.
   */
  public readonly url: URL;

  /**
   * Instantiates a client-side error.
   */
  public constructor(type: ErrorType, code: ErrorCode, message: string);

  /**
   * Instantiates a client-side error with a URL.
   */
  public constructor(
    type: ErrorType,
    code: ErrorCode,
    message: string,
    url: string
  );

  /**
   * Instantiates a server-side error.
   */
  public constructor(
    requestID: string | undefined,
    source: ErrorSource,
    type: ErrorType,
    code: ErrorCode,
    message: string,
    url?: string
  );

  public constructor(
    ...args:
      | [ErrorType, ErrorCode, string]
      | [ErrorType, ErrorCode, string, string]
      | [string | undefined, ErrorSource, ErrorType, ErrorCode, string]
      | [string | undefined, ErrorSource, ErrorType, ErrorCode, string, string]
  ) {
    let requestID,
      source: ErrorSource,
      type: ErrorType,
      code: ErrorCode,
      message,
      url;

    // Determine which overload was called
    if (args.length >= 5) {
      requestID = args[0] as string;
      source = args[1] as ErrorSource;
      type = args[2] as ErrorType;
      code = args[3] as ErrorCode;
      message = args[4] as string;
      url = args[5] as string;
    } else {
      source = "shipengine";
      type = args[0] as ErrorType;
      code = args[1] as ErrorCode;
      message = args[2] as string;
      url = args[3] as string;
    }

    super(message);

    this.name = new.target.name;
    this.source = source;
    this.type = type;
    this.code = code;
    this.requestID = requestID;
    this.url = new URL(url || "https://www.shipengine.com/docs/errors/codes/");
  }

  /**
   * Converts the error object to a POJO that can easily be logged or serialized.
   */
  public toJSON(): Readonly<ShipEngineError> {
    return {
      ...this,
      name: this.name,
      message: this.message,
      stack: this.stack,
    };
  }
}
