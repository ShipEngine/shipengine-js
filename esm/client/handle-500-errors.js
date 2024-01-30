import { ShipEngineError } from "../errors";
export function handle500Errors() {
    throw new ShipEngineError("system", "unspecified", "An unknown error occurred while calling the ShipEngine API.");
}
//# sourceMappingURL=handle-500-errors.js.map