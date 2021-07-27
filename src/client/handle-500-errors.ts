import { ShipEngineError } from "../errors";

export function handle500Errors(): unknown {
  throw new ShipEngineError(
    "system",
    "unspecified",
    "An unknown error occurred while calling the ShipEngine API."
  );
}
