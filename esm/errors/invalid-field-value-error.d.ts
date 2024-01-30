import { ErrorSource } from "../constants";
import { ShipEngineError } from "./shipengine-error";
declare type FieldValue = any;
/**
 * This error occurs when a field has been set to an invalid value.
 */
export declare class InvalidFieldValueError extends ShipEngineError {
    /**
     * The name of the invalid field.
     */
    readonly fieldName: string;
    /**
     * The value of the invalid field.
     */
    readonly fieldValue: FieldValue;
    /**
     * Instantiates a client-side error.
     */
    constructor(fieldName: string, reason: string, fieldValue?: FieldValue);
    /**
     * Instantiates a server-side error.
     */
    constructor(requestID: string, source: ErrorSource, fieldName: string, reason: string, fieldValue?: FieldValue);
}
export {};
