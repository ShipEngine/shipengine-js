// Karma config
// https://karma-runner.github.io/0.12/config/configuration-file.html
// https://jstools.dev/karma-config/

'use strict';
const { karmaConfig } = require('@jsdevtools/karma-config');
// const { host } = require('@jsdevtools/host-environment');
const { karmaProxyBaseUri, apiBaseUri } = require('./test/utils/constants');

module.exports = (cfg) => {
  const getConfig = karmaConfig({
    sourceDir: './esm.test',
    tests: ['./esm.test/**/*.spec.js'],

    config: {
      frameworks: ['mocha', 'host-environment'],
      proxies: {
        [karmaProxyBaseUri]: {
          target: apiBaseUri,
          changeOrigin: true,
        },
      },
    },
    browsers: {
      chrome: true,
      firefox: false,
      safari: false,
      edge: false,
      ie: false,
    },
    CI: true, // headless
  });
  getConfig(cfg);
};
