"use strict";
/* eslint-env browser */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserAgentString = exports.AbortController = void 0;
// NOTE: We have to use `require` instead of `import` here because the package.json
// file is outside of the "src" directory, so TypeScript can't see it
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version: sdkVersion } = require("../package.json");
// In web browsers we use the native AbortController API
exports.AbortController = window.AbortController;
/**
 * Returns the User-Agent string for the browser SDK
 */
function getUserAgentString() {
    return `shipengine-js/${sdkVersion} ` + navigator.userAgent;
}
exports.getUserAgentString = getUserAgentString;
//# sourceMappingURL=isomorphic.browser.js.map