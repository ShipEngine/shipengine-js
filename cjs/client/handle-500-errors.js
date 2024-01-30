"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handle500Errors = void 0;
const errors_1 = require("../errors");
function handle500Errors() {
    throw new errors_1.ShipEngineError("system", "unspecified", "An unknown error occurred while calling the ShipEngine API.");
}
exports.handle500Errors = handle500Errors;
//# sourceMappingURL=handle-500-errors.js.map