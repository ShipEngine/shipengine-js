/* eslint-env node */
import AbortController from "abort-controller";
import nodeFetch from "node-fetch";
import * as os from "os";
// NOTE: We have to use `require` instead of `import` here because the package.json
// file is outside of the "src" directory, so TypeScript can't see it
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version: sdkVersion } = require("../package.json");
// Node.js does not natively support the Fetch API yet,
// so polyfill using the node-fetch library instead.
// NOTE: The cast is necessary because node-fetch does not 100% match the Fetch API
globalThis.fetch = nodeFetch;
// Node.js does not natively support the AbortController API yet,
// so use the abort-controller library instead.
export { AbortController };
/**
 * Returns the User-Agent string for the Node.js SDK
 */
export function getUserAgentString() {
    const osName = os.platform();
    const osVersion = os.release();
    const nodeVersion = process.version;
    return `shipengine-js/${sdkVersion} ${osName}/${osVersion} Node/${nodeVersion}`;
}
//# sourceMappingURL=isomorphic.node.js.map