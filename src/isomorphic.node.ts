/* eslint-env node */

import AbortController from "abort-controller";
import { EventEmitter } from "events";
import nodeFetch from "node-fetch";
import * as os from "os";

// NOTE: We have to use `require` instead of `import` here because the package.json
// file is outside of the "src" directory, so TypeScript can't see it
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version: sdkVersion } = require("../package.json");

// Node.js does not natively support the Fetch API yet,
// so use the node-fetch library instead.
// NOTE: The cast is necessary because node-fetch does not 100% match the Fetch API
export const fetch = (nodeFetch as unknown) as typeof window["fetch"];

// Node.js does not natively support the AbortController API yet,
// so use the abort-controller library instead.
export { AbortController };

// In Node.js we use the native EventEmitter class
export { EventEmitter };

/**
 * Returns the User-Agent string for the Node.js SDK
 */
export function getUserAgentString(): string {
  const osName = os.platform();
  const osVersion = os.release();
  const nodeVersion = process.version;
  return `shipengine-js/${sdkVersion} ${osName}/${osVersion} Node/${nodeVersion}`;
}
