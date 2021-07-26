import { RateOptions, Shipment, ShipmentId } from "./public-params";
import { GetRatesResult } from "./public-result";

export * from "./public-params";
export * from "./public-result";

export type Params = (ShipmentId | Shipment) & RateOptions;

export type Response = GetRatesResult;
