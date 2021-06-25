// Karma config
// https://karma-runner.github.io/0.12/config/configuratio
// https://jstools.dev/karma-config/

'use strict';

const { karmaConfig } = require('@jsdevtools/karma-config');
// const { host } = require('@jsdevtools/host-environment');
const { karmaProxyBaseUri, baseURL } = require('./test/utils/constants');

module.exports = (cfg) => {
  cfg.set({
    // Defaults to the Karma-Verbose-Reporter
    // See https://www.npmjs.com/package/karma-verbose-reporter
    reporters: ["verbose", 'coverage-istanbul'],
  
    // The browsers will vary depending on the OS.
    // In CI/CD environments, FirefoxHeadless and ChromeHeadless are used instead.
    // browsers: ["Firefox", "Chrome"],
    browsers: ["ChromeHeadless"],

    frameworks: [
      // Defaults to the Mocha test framework.
      "mocha",
  
      // This makes it easy to detect which browser your tests are running in.
      // Also provides access to environment variables.
      // See https://jstools.dev/karma-host-environment
      // "host-environment"
    ],
  
    files: [
      'test/specs/!(file-system.spec).js',  
    ],
  
    preprocessors: {
      // Uses Webpack to bundle your tests and their dependencies
      "test/**/*.+(spec|test).+(js|jsx|mjs)": ["webpack"]
    },
    
    processKillTimeout: 5000,

    webpack: {
      // Webpack development mode it easier to debug failing tests
      mode: "development",
  
      // Inlne source maps ensure proper stack traces in errors,
      // and allow you to debug your original source code rather than bundled code.
      devtool: "inline-source-map",
      module: {
        rules: [
          {
            test: /\.(js|jsx|mjs)$/,
            include: /.\/esm/,
            exclude: /node_modules|\.spec\.|\.test\./,
            enforce: 'post',
            use: '@jsdevtools/coverage-istanbul-loader'
          }
        ]
      }
    },
    coverageIstanbulReporter: {
      dir: 'coverage/%browser%',
      reports: [
        'text-summary',
        'lcov'
      ],
      skipFilesWithNoCoverage: true
    }
  });
};
