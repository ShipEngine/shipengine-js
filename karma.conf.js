// Karma config
// https://karma-runner.github.io/0.12/config/configuration-file.html
// https://jstools.dev/karma-config/

'use strict';
const { karmaConfig, buildConfig } = require('@jsdevtools/karma-config');
const { host } = require('@jsdevtools/host-environment');
const {
  hoverflyProxyPath,
  hoverflyProxyApiPath,
  configProxyApiPath,
  configProxyPath,
} = require('./test/utils/constants');

module.exports = (cfg) => {
  const getConfig = karmaConfig({
    sourceDir: 'esm',
    config: {
      frameworks: ['mocha', 'host-environment', 'child-process'],
      plugins: ['karma-child-process'],
      proxies: {
        [configProxyApiPath]: {
          target: configProxyPath,
          changeOrigin: true,
        },
        [hoverflyProxyApiPath]: {
          target: hoverflyProxyPath,
          changeOrigin: true,
        },
      },
      client: {
        childProcess: {
          path: './test/utils/config-server/start-config-server.js',
          args: [],
          options: {},
        },
      },
    },
    browsers: {
      chrome: host.ci ? host.os.linux : true,
      firefox: false,
      safari: false,
      edge: false,
      ie: false,
    },
  });
  getConfig(cfg);
};
