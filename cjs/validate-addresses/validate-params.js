"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParams = void 0;
const errors_1 = require("../errors");
/**
 * Performs client-side validation of the address params that's passed-in by the user.
 */
function validateParams(params) {
    if (!Array.isArray(params)) {
        throw new errors_1.InvalidFieldValueError("Params", "must be an array.");
    }
}
exports.validateParams = validateParams;
//# sourceMappingURL=validate-params.js.map