import { ShipEngine } from "./shipengine";

export { NormalizedAddress } from "./address/normalized-address";
export * from "./address/public-types";
export { ShipEngineConfig } from "./config";
export * from "./enums";
export { ShipEngineError } from "./errors";
export { ShipEngine };

// Export `myLibrary` as the default export
export default ShipEngine;

// CommonJS default export hack
/* eslint-env commonjs */
if (typeof module === "object" && typeof module.exports === "object") {
  module.exports = Object.assign(module.exports.default, module.exports);
}
