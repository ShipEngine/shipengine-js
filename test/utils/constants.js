/**
 * proxy from karma browser to the karma hoverfly server
 */
const hoverflyProxyApiPath = '/hoverfly-proxy';
const hoverflyProxyPort = 8500;
const hoverflyProxyPath = `http://localhost:${hoverflyProxyPort}`;

/**
 * proxy from karma browser to the karma config server
 */
const configProxyApiPath = '/config-proxy';
const configProxyPort = 9877;
const configProxyPath = `http://localhost:${configProxyPort}`;

/**
 * internal port running on the docker container
 * https://docs.hoverfly.io/en/latest/pages/reference/api/api.html
 *
 */
const hoverflyActualAPIPort = 8888;

const hoverflyBaseUrl =
  typeof window === 'undefined' ? hoverflyProxyPath : hoverflyProxyApiPath;

module.exports = {
  configProxyApiPath,
  configProxyPath,
  configProxyPort,
  hoverflyProxyApiPath,
  hoverflyProxyPath,
  hoverflyBaseUrl,
  hoverflyActualAPIPort,
};
