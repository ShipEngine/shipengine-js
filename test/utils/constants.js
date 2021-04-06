/**
 * proxy from karma browser to the karma hoverfly server
 */
const karmaProxyBaseUri = "/hoverfly-proxy";
const apiBaseUri = `https://simengine.herokuapp.com`;

const onServer = typeof window === "undefined";

const isomorphicBaseUri = onServer ? apiBaseUri : karmaProxyBaseUri;

module.exports = {
  karmaProxyBaseUri,
  apiBaseUri,
  isomorphicBaseUri,
};
