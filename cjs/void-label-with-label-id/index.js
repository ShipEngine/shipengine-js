"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.voidLabelWithLabelId = exports.VoidLabelWithLabelIdTypes = void 0;
const client_1 = require("../client");
const VoidLabelWithLabelIdTypes = require("./types/public");
exports.VoidLabelWithLabelIdTypes = VoidLabelWithLabelIdTypes;
const errors_1 = require("../errors");
/**
 * Void a label with its ID
 *
 * https://www.shipengine.com/docs/labels/voiding/
 */
async function voidLabelWithLabelId(id, config) {
    if (typeof id !== "string") {
        throw new errors_1.InvalidFieldValueError("ID", "must be a string.", id);
    }
    const response = await client_1.put(`/v1/labels/${id}/void`, {}, config);
    return response;
}
exports.voidLabelWithLabelId = voidLabelWithLabelId;
//# sourceMappingURL=index.js.map