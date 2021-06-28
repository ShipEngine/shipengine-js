/* eslint-env browser */

// NOTE: We have to use `require` instead of `import` here because the package.json
// file is outside of the "src" directory, so TypeScript can't see it
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version: sdkVersion } = require("../package.json");

// In web browsers we use the native Fetch API
export const fetch = window.fetch;

// In web browsers we use the native AbortController API
export const AbortController = window.AbortController;

// Web browsers don't support the EventEmitter API, so use tiny-eventemitter instead
import EventEmitter from "tp-events";
export { EventEmitter };

/**
 * Returns the User-Agent string for the browser SDK
 */
export function getUserAgentString(): string {
  return `shipengine-js/${sdkVersion} ` + navigator.userAgent;
}
