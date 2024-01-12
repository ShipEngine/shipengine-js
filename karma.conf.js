// Karma config
// https://karma-runner.github.io/0.12/config/configuration-file.html
// https://jstools.dev/karma-config/

"use strict";
const { host } = require("@jsdevtools/host-environment");

const browsers = ["ChromeWithoutSecurity"];

module.exports = (cfg) => {
  cfg.set({
    reporters: ["verbose", "coverage-istanbul"],

    browsers,

    frameworks: ["mocha"],

    client: {
      mocha: {
        timeout: 60000, // 60 seconds - upped from 2 seconds
      },
    },

    files: ["test/specs/!(file-system.spec).js"],

    preprocessors: {
      // Uses Webpack to bundle your tests and their dependencies
      "test/**/*.+(spec|test).+(js|jsx|mjs)": ["webpack"],
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
            include: /esm/,
            exclude: /node_modules|\.spec\.|\.test\./,
            enforce: "post",
            use: "@jsdevtools/coverage-istanbul-loader",
          },
        ],
      },
    },
    coverageIstanbulReporter: {
      dir: "coverage/%browser%",
      reports: ["text-summary", "lcov"],
      skipFilesWithNoCoverage: true,
    },
    customLaunchers: {
      ChromeWithoutSecurity: {
        base: "ChromeHeadless",
        flags: ["--disable-web-security"],
      },
    },
  });
};
