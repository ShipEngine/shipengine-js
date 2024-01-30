import { NormalizedConfig } from "../config";
import * as VoidLabelWithLabelIdTypes from "./types/public";
export { VoidLabelWithLabelIdTypes };
/**
 * Void a label with its ID
 *
 * https://www.shipengine.com/docs/labels/voiding/
 */
export declare function voidLabelWithLabelId(id: string, config: NormalizedConfig): Promise<VoidLabelWithLabelIdTypes.Result>;
