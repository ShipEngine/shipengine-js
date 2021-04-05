import { ShipEngine } from "./shipengine";

export * from "./address/public-types";
export { ShipEngineConfig } from "./config";
export { ShipEngineError } from "./errors";
export * from "./errors/enums";
export { Country } from "./types/country";
export { ShipEngine };

// Export `myLibrary` as the default export
export default ShipEngine;

// CommonJS default export hack
/* eslint-env commonjs */
if (typeof module === "object" && typeof module.exports === "object") {
  module.exports = Object.assign(module.exports.default, module.exports);
}
