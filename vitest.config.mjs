// Vitest config
// https://vitest.dev/config/
//
// Two projects run the same specs against different build outputs:
//   node    - the built CommonJS output (cjs/), which installs node-fetch
//   browser - the built ESM output (esm/) in Chromium via Playwright, using the
//             package.json "browser" field to swap isomorphic.node.js for
//             isomorphic.browser.js
// Run `npm run build` first.
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";

const path = (p) => fileURLToPath(new URL(p, import.meta.url));

const common = {
  globals: true,
  include: ["test/specs/**/*.spec.js"],
  testTimeout: 60000, // karma/mocha used 60 seconds
  hookTimeout: 60000,
};

// The ESM build of isomorphic.browser.js contains a CommonJS-style
// `require("../package.json")` (webpack used to resolve it). Browsers have no
// `require`, so turn it into an equivalent static import, in place so line
// numbers (and source maps) are unchanged.
const requirePackageJson = {
  name: "esm-require-package-json",
  enforce: "pre",
  transform(code, id) {
    if (!/\/esm\/isomorphic\.browser\.js$/.test(id)) return;
    return code.replace(
      /const \{ version: sdkVersion \} = require\("\.\.\/package\.json"\);/,
      'import { version as sdkVersion } from "../package.json";'
    );
  },
};

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      include: ["cjs/**/*.js", "esm/**/*.js"],
      exclude: ["**/*.d.ts", "src/typings/**", "src/**/types/**"],
    },
    projects: [
      {
        resolve: {
          alias: { "shipengine-sdk": path("cjs/index.js") },
        },
        test: {
          ...common,
          name: "node",
          environment: "node",
          // Load the CommonJS build with Node's own loader instead of
          // transforming it, so the tests exercise exactly what `require()` gets.
          server: { deps: { external: [/\/cjs\//] } },
        },
      },
      {
        plugins: [requirePackageJson],
        resolve: {
          alias: { "shipengine-sdk": path("esm/index.js") },
        },
        test: {
          ...common,
          name: "browser",
          // Node-only checks of the source tree
          exclude: ["test/specs/file-system.spec.js"],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
});
