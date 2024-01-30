/* eslint-env browser */
// NOTE: We have to use `require` instead of `import` here because the package.json
// file is outside of the "src" directory, so TypeScript can't see it
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version: sdkVersion } = require("../package.json");
// In web browsers we use the native AbortController API
export const AbortController = window.AbortController;
/**
 * Returns the User-Agent string for the browser SDK
 */
export function getUserAgentString() {
    return `shipengine-js/${sdkVersion} ` + navigator.userAgent;
}
//# sourceMappingURL=isomorphic.browser.js.map