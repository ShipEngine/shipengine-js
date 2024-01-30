import { ErrorSource } from "../constants";
import { ShipEngineError } from "./shipengine-error";
/**
 * This error occurs when a rquired field has not been set.
 * This includes fields that are conditionally required.
 */
export declare class FieldValueRequiredError extends ShipEngineError {
    /**
     * The name of the missing field.
     */
    readonly fieldName: string;
    /**
     * Instantiates a client-side error.
     */
    constructor(fieldName: string);
    /**
     * Instantiates a server-side error.
     */
    constructor(requestID: string, source: ErrorSource, fieldName: string);
}
