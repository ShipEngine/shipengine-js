// https://typedoc.org/guides/options
module.exports = {
  // disableSources: true, // blob changes all the time, so disable
  exclude: [
    'src/models/api/**',
    'src/models/mappers/**',
    'src/utils/**',
    'src/client.ts',
  ],
  mode: 'file',
  name: 'ShipEngine JS API',
  target: 'esnext',
  out: 'docs/api',
  excludeExternals: true,
  excludeNotExported: true,
  excludePrivate: true,
};
