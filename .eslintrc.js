module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    node: true,
    browser: true,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'plugin:import/errors', // for catching immediately-executed imports like "import ./foo"
    'plugin:import/typescript', // disable rules that overlap with typescript
  ],
  rules: {
    '@typescript-eslint/ban-types': 'off',
  },
};
