// Karma config
// https://karma-runner.github.io/0.12/config/configuratio
// https://jstools.dev/karma-config/

'use strict';
const { host } = require('@jsdevtools/host-environment');

const browsers = ["ChromeHeadless", "FirefoxHeadless"];

if (host.os.mac) {
  browsers.push("Safari")
}

if (host.os.windows) {
  browsers.push("Edge");
}

module.exports = (cfg) => {
  cfg.set({
    // Defaults to the Karma-Verbose-Reporter
    // See https://www.npmjs.com/package/karma-verbose-reporter
    reporters: ["verbose", 'coverage-istanbul'],
  
    // The browsers will vary depending on the OS.
    // In CI/CD environments, FirefoxHeadless and ChromeHeadless are used instead.
    // browsers: ["Firefox", "Chrome"],
    browsers,

    frameworks: [
      // Defaults to the Mocha test framework.
      "mocha",
  
      // This makes it easy to detect which browser your tests are running in.
      // Also provides access to environment variables.
      // See https://jstools.dev/karma-host-environment
      // "host-environment"
    ],

    client: {
      mocha: {
        timeout : 6000 // 6 seconds - upped from 2 seconds
      }
    },
  
    files: [
      'test/specs/!(file-system.spec).js',  
    ],
  
    preprocessors: {
      // Uses Webpack to bundle your tests and their dependencies
      "test/**/*.+(spec|test).+(js|jsx|mjs)": ["webpack"]
    },

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
