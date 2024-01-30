"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidFieldValueError = void 0;
const shipengine_error_1 = require("./shipengine-error");
/**
 * This error occurs when a field has been set to an invalid value.
 */
class InvalidFieldValueError extends shipengine_error_1.ShipEngineError {
    constructor(...args) {
        let requestID, source, fieldName, reason, fieldValue;
        // Determine which overload was called
        if (args.length >= 4) {
            requestID = args[0];
            source = args[1];
            fieldName = args[2];
            reason = args[3];
            fieldValue = args[4];
        }
        else {
            source = "shipengine";
            fieldName = args[0];
            reason = args[1];
            fieldValue = args[2];
        }
        super(requestID, source, "validation", "invalid_field_value", `${fieldName || "Field"} ${reason}`);
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
    }
}
exports.InvalidFieldValueError = InvalidFieldValueError;
//# sourceMappingURL=invalid-field-value-error.js.map