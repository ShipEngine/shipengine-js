"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParams = void 0;
const errors_1 = require("../errors");
/**
 * Performs client-side validation of the params passed in by the user.
 */
function validateParams(params) {
    if (typeof params.trackingNumber !== "string") {
        throw new errors_1.InvalidFieldValueError("Params", "must be a string.");
    }
    if (typeof params.carrierCode !== "string") {
        throw new errors_1.InvalidFieldValueError("Params", "must be a string.");
    }
}
exports.validateParams = validateParams;
//# sourceMappingURL=validate-params.js.map