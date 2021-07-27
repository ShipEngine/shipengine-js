import { ErrorSource } from "../constants";
import { ShipEngineError } from "./shipengine-error";

/**
 * This error occurs when a rquired field has not been set.
 * This includes fields that are conditionally required.
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
    let requestID, source: ErrorSource, fieldName;

    // Determine which overload was called
    if (args.length >= 3) {
      requestID = args[0] as string;
      source = args[1] as ErrorSource;
      fieldName = args[2] as string;
    } else {
      source = "shipengine";
      fieldName = args[0] as string;
    }

    super(
      requestID,
      source,
      "validation",
      "field_value_required",
      `${fieldName || "Field"} is required.`
    );

    this.fieldName = fieldName;
  }
}
