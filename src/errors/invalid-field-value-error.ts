import { ErrorSource } from "../constants";
import { ShipEngineError } from "./shipengine-error";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FieldValue = any;

/**
 * This error occurs when a field has been set to an invalid value.
 */
export class InvalidFieldValueError extends ShipEngineError {
  /**
   * The name of the invalid field.
   */
  public readonly fieldName: string;

  /**
   * The value of the invalid field.
   */
  public readonly fieldValue: FieldValue;

  /**
   * Instantiates a client-side error.
   */
  public constructor(
    fieldName: string,
    reason: string,
    fieldValue?: FieldValue
  );

  /**
   * Instantiates a server-side error.
   */
  public constructor(
    requestID: string,
    source: ErrorSource,
    fieldName: string,
    reason: string,
    fieldValue?: FieldValue
  );

  public constructor(
    ...args:
      | [string, string]
      | [string, string, FieldValue]
      | [string, ErrorSource, string, string]
      | [string, ErrorSource, string, string, FieldValue]
  ) {
    let requestID, source: ErrorSource, fieldName, reason, fieldValue;

    // Determine which overload was called
    if (args.length >= 4) {
      requestID = args[0] as string;
      source = args[1] as ErrorSource;
      fieldName = args[2] as string;
      reason = args[3] as string;
      fieldValue = args[4] as FieldValue;
    } else {
      source = "shipengine";
      fieldName = args[0] as string;
      reason = args[1] as string;
      fieldValue = args[2] as FieldValue;
    }

    super(
      requestID,
      source,
      "validation",
      "invalid_field_value",
      `${fieldName || "Field"} ${reason}`
    );

    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
  }
}
