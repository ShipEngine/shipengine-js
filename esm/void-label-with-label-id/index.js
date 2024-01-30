import { put } from "../client";
import * as VoidLabelWithLabelIdTypes from "./types/public";
import { InvalidFieldValueError } from "../errors";
export { VoidLabelWithLabelIdTypes };
/**
 * Void a label with its ID
 *
 * https://www.shipengine.com/docs/labels/voiding/
 */
export async function voidLabelWithLabelId(id, config) {
    if (typeof id !== "string") {
        throw new InvalidFieldValueError("ID", "must be a string.", id);
    }
    const response = await put(`/v1/labels/${id}/void`, {}, config);
    return response;
}
//# sourceMappingURL=index.js.map