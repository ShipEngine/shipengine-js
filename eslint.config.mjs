// ESLint flat config
// https://eslint.org/docs/latest/use/configure/configuration-files
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";

const testGlobals = {
  ...globals.node,
  ...globals.browser,
  // Vitest globals (`test.globals: true` in vitest.config.mjs)
  describe: "readonly",
  it: "readonly",
  test: "readonly",
  expect: "readonly",
  vi: "readonly",
  beforeAll: "readonly",
  afterAll: "readonly",
  beforeEach: "readonly",
  afterEach: "readonly",
};

export default tseslint.config(
  {
    ignores: [
      "esm/**",
      "cjs/**",
      "node_modules/**",
      "coverage/**",
      "**/types/private-request.ts",
      "**/types/private-response.ts",
    ],
  },

  // TypeScript source files (type-aware)
  {
    files: ["src/**/*.ts"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      prettierRecommended,
    ],
    rules: {
      // typescript-eslint 8 promoted this from "warn" (v4 recommended) to "error";
      // keep the previous severity rather than editing existing src.
      "@typescript-eslint/no-explicit-any": "warn",
    },
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // JavaScript test files, ESM (Vitest, with `globals: true`)
  {
    files: ["test/**/*.js", "test/**/*.mjs"],
    ignores: ["test/compat/**"],
    extends: [js.configs.recommended, prettierRecommended],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: testGlobals,
    },
  },

  // Standalone Node.js 12 smoke script (CommonJS), run by CI outside Vitest
  {
    files: ["test/compat/**/*.js", "test/compat/**/*.cjs"],
    extends: [js.configs.recommended, prettierRecommended],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: globals.node,
    },
  },

  // Vitest config
  {
    files: ["vitest.config.mjs"],
    extends: [js.configs.recommended, prettierRecommended],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: globals.node,
    },
  }
);
