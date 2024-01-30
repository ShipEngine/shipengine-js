"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldValueRequiredError = void 0;
const shipengine_error_1 = require("./shipengine-error");
/**
 * This error occurs when a rquired field has not been set.
 * This includes fields that are conditionally required.
 */
class FieldValueRequiredError extends shipengine_error_1.ShipEngineError {
    constructor(...args) {
        let requestID, source, fieldName;
        // Determine which overload was called
        if (args.length >= 3) {
            requestID = args[0];
            source = args[1];
            fieldName = args[2];
        }
        else {
            source = "shipengine";
            fieldName = args[0];
        }
        super(requestID, source, "validation", "field_value_required", `${fieldName || "Field"} is required.`);
        this.fieldName = fieldName;
    }
}
exports.FieldValueRequiredError = FieldValueRequiredError;
//# sourceMappingURL=field-value-required-error.js.map