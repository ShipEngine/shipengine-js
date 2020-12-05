const hoverflyProxyApiPath = '/hoverfly-proxy';
const hoverflyProxyPath = 'http://localhost:8500';

const configProxyApiPath = '/config-proxy';
const configProxyPath = 'http://localhost:9877';

const hoverflyBaseUrl =
  typeof window === 'undefined' ? hoverflyProxyPath : hoverflyProxyApiPath;

module.exports = {
  configProxyApiPath,
  configProxyPath,
  hoverflyProxyApiPath,
  hoverflyProxyPath,
  hoverflyBaseUrl,
};
