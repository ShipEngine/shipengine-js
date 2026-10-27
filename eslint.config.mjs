// ESLint flat config
// https://eslint.org/docs/latest/use/configure/configuration-files
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";

const testGlobals = {
  ...globals.mocha,
  ...globals.node,
  ...globals.browser,
  // Vitest (when used without `globals: true`, these are imported; harmless otherwise)
  expect: "readonly",
  vi: "readonly",
  beforeAll: "readonly",
  afterAll: "readonly",
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

  // JavaScript test files, CommonJS (Mocha era)
  {
    files: ["test/**/*.js", "test/**/*.cjs"],
    extends: [js.configs.recommended, prettierRecommended],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: testGlobals,
    },
  },

  // JavaScript test files, ESM (Vitest)
  {
    files: ["test/**/*.mjs"],
    extends: [js.configs.recommended, prettierRecommended],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: testGlobals,
    },
  }
);
