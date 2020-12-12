module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    createDefaultProgram: true,
    project: './tsconfig.json',
    ecmaVersion: '2018',
    sourceType: 'module',
  },
  env: {
    node: true,
    mocha: true,
    browser: true,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended', // for js files
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'plugin:import/errors', // for catching immediately-executed imports like "import ./foo"
    'plugin:import/warnings',
    'plugin:import/typescript', // disable rules that overlap with typescript
  ],
  ignorePatterns: ['esm', 'cjs', 'node_modules', 'docs/api'],
  rules: {
    'import/no-default-export': 2,
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/promise-function-async': 2,
    '@typescript-eslint/no-floating-promises': [2, { ignoreIIFE: true }],
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 0,
      },
    },
    {
      files: ['docs/examples/**/*.ts'],
      rules: {
        '@typescript-eslint/no-var-requires': 0,
        'import/no-unresolved': 0,
      },
    },
  ],
};
