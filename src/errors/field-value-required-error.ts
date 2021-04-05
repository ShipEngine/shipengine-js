import { ErrorCode, ErrorSource, ErrorType } from "./enums";
import { ShipEngineError } from "./shipengine-error";

/**
 * This error occurs when a rquired field has not been set.
 * This icnludes fields that are conditionally required.
 */
export class FieldValueRequiredError extends ShipEngineError {
  /**
   * The name of the missing field.
   */
  public readonly fieldName: string;

  /**
   * Instantiates a client-side error.
   */
  public constructor(fieldName: string);

  /**
   * Instantiates a server-side error.
   */
  public constructor(requestID: string, source: ErrorSource, fieldName: string);

  public constructor(...args: [string] | [string, ErrorSource, string]) {
    let requestID, source, fieldName;

    // Determine which overload was called
    if (args.length >= 3) {
      requestID = args[0] as string;
      source = args[1] as ErrorSource;
      fieldName = args[2] as string;
    } else {
      source = ErrorSource.ShipEngine;
      fieldName = args[0] as string;
    }

    super(
      requestID,
      source,
      ErrorType.Validation,
      ErrorCode.FieldValueRequired,
      `${fieldName || "Field"} is required.`
    );

    this.fieldName = fieldName;
  }
}
