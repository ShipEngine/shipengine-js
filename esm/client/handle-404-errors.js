import { ShipEngineError } from "../errors";
export function isNetworkStructuredError(error) {
    return typeof error.request_id === "string" && Array.isArray(error.errors);
}
export function handle404Errors(body) {
    if (isNetworkStructuredError(body)) {
        throw new ShipEngineError(body.request_id, "shipengine", body.errors[0].error_type, body.errors[0].error_code, body.errors[0].message);
    }
    else {
        throw new ShipEngineError("system", "unspecified", "An unknown error occurred while calling the ShipEngine API");
    }
}
//# sourceMappingURL=handle-404-errors.js.map