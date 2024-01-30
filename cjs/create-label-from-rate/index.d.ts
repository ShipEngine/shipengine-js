import { NormalizedConfig } from "../config";
import * as CreateLabelFromRateTypes from "./types/public";
export { CreateLabelFromRateTypes };
/**
 * Purchase and print a label for shipment
 *
 * https://shipengine.github.io/shipengine-openapi/#operation/create_label_from_rate
 */
export declare function createLabelFromRate(params: CreateLabelFromRateTypes.Params, config: NormalizedConfig): Promise<CreateLabelFromRateTypes.Result>;
