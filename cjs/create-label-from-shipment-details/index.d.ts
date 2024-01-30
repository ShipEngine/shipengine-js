import { NormalizedConfig } from "../config";
import * as CreateLabelFromShipmentDetailsTypes from "./types/public";
export { CreateLabelFromShipmentDetailsTypes };
/**
 * Purchase and print a label for shipment
 *
 * https://shipengine.github.io/shipengine-openapi/#operation/create_label
 */
export declare function createLabelFromShipmentDetails(params: CreateLabelFromShipmentDetailsTypes.Params, config: NormalizedConfig): Promise<CreateLabelFromShipmentDetailsTypes.Result>;
