import { ShipEngine } from "./shipengine";
export { ValidateAddressesTypes } from "./validate-addresses";
export * from "./constants";
export * from "./errors";
export { ShipEngine };
// Export `myLibrary` as the default export
export default ShipEngine;
// CommonJS default export hack
/* eslint-env commonjs */
if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = Object.assign(module.exports.default, module.exports);
}
//# sourceMappingURL=index.js.map