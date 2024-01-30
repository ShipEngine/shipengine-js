"use strict";
/* eslint-env node */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserAgentString = exports.AbortController = void 0;
const abort_controller_1 = require("abort-controller");
exports.AbortController = abort_controller_1.default;
const node_fetch_1 = require("node-fetch");
const os = require("os");
// NOTE: We have to use `require` instead of `import` here because the package.json
// file is outside of the "src" directory, so TypeScript can't see it
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version: sdkVersion } = require("../package.json");
// Node.js does not natively support the Fetch API yet,
// so polyfill using the node-fetch library instead.
// NOTE: The cast is necessary because node-fetch does not 100% match the Fetch API
globalThis.fetch = node_fetch_1.default;
/**
 * Returns the User-Agent string for the Node.js SDK
 */
function getUserAgentString() {
    const osName = os.platform();
    const osVersion = os.release();
    const nodeVersion = process.version;
    return `shipengine-js/${sdkVersion} ${osName}/${osVersion} Node/${nodeVersion}`;
}
exports.getUserAgentString = getUserAgentString;
//# sourceMappingURL=isomorphic.node.js.map