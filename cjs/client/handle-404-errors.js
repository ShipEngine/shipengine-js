"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handle404Errors = exports.isNetworkStructuredError = void 0;
const errors_1 = require("../errors");
function isNetworkStructuredError(error) {
    return typeof error.request_id === "string" && Array.isArray(error.errors);
}
exports.isNetworkStructuredError = isNetworkStructuredError;
function handle404Errors(body) {
    if (isNetworkStructuredError(body)) {
        throw new errors_1.ShipEngineError(body.request_id, "shipengine", body.errors[0].error_type, body.errors[0].error_code, body.errors[0].message);
    }
    else {
        throw new errors_1.ShipEngineError("system", "unspecified", "An unknown error occurred while calling the ShipEngine API");
    }
}
exports.handle404Errors = handle404Errors;
//# sourceMappingURL=handle-404-errors.js.map