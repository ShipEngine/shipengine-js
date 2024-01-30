"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handle400Errors = exports.isNetworkStructuredError = void 0;
const errors_1 = require("../errors");
function isNetworkStructuredError(error) {
    return typeof error.request_id === "string" && Array.isArray(error.errors);
}
exports.isNetworkStructuredError = isNetworkStructuredError;
function handle400Errors(body) {
    if (isNetworkStructuredError(body)) {
        throw new errors_1.ShipEngineError(body.request_id, "shipengine", body.errors[0].error_type, body.errors[0].error_code, body.errors[0].message);
    }
    else {
        throw new errors_1.ShipEngineError("system", "unspecified", "An unknown error occurred while calling the ShipEngine API");
    }
}
exports.handle400Errors = handle400Errors;
//# sourceMappingURL=handle-400-errors.js.map