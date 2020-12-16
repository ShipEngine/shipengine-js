// https://typedoc.org/guides/options
module.exports = {
  gitRevision: 'main', // avoid "https://github.com/ShipEngine/shipengine-js/abc1245677 links
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
