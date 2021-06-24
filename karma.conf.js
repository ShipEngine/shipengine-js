// Karma config
// https://karma-runner.github.io/0.12/config/configuratio
// https://jstools.dev/karma-config/

'use strict';

const { karmaConfig } = require('@jsdevtools/karma-config');
// const { host } = require('@jsdevtools/host-environment');
const { karmaProxyBaseUri, baseURL } = require('./test/utils/constants');

module.exports = (cfg) => {
  const getConfig = karmaConfig({
    sourceDir: './esm',
    testDir: 'test',
    tests: ['test/specs/!(exports.spec).js'],

    // config: {
    //   files: [
    //     { pattern: 'test/specs/!(exports.spec).js', type: 'module' }
    //   ]
    // },

    browsers: {
      chrome: true,
      firefox: false,
      safari: false,
      edge: false,
    },
    CI: true, // headless
  });
  getConfig(cfg);
};
