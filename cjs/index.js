"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipEngine = exports.ValidateAddressesTypes = void 0;
const shipengine_1 = require("./shipengine");
Object.defineProperty(exports, "ShipEngine", { enumerable: true, get: function () { return shipengine_1.ShipEngine; } });
var validate_addresses_1 = require("./validate-addresses");
Object.defineProperty(exports, "ValidateAddressesTypes", { enumerable: true, get: function () { return validate_addresses_1.ValidateAddressesTypes; } });
__exportStar(require("./constants"), exports);
__exportStar(require("./errors"), exports);
// Export `myLibrary` as the default export
exports.default = shipengine_1.ShipEngine;
// CommonJS default export hack
/* eslint-env commonjs */
if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = Object.assign(module.exports.default, module.exports);
}
//# sourceMappingURL=index.js.map