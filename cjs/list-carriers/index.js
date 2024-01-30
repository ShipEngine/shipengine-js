"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCarriers = exports.ListCarriersTypes = void 0;
const client_1 = require("../client");
const ListCarriersTypes = require("./types/public");
exports.ListCarriersTypes = ListCarriersTypes;
const format_response_1 = require("./format-response");
/**
 * This function returns a list of all your connected carrier accounts,
 * along with helpful information about each account, its options, the services it offers, etc.
 *
 * https://www.shipengine.com/docs/reference/list-carriers/
 */
async function listCarriers(config) {
    const response = await client_1.get("/v1/carriers", config);
    return format_response_1.formatResponse(response);
}
exports.listCarriers = listCarriers;
//# sourceMappingURL=index.js.map