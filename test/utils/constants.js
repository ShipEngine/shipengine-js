"use strict";

/**
 * The URL of the ShipEngine API to use for testing.
 * If not set, it will default to the public ShipEngine API.
 */
exports.baseURL = process.env["BASE_URL"] || "https://api.shipengine.com/";

/**
 * The API key to use for testing. If not set, it defaults to a dummy key.
 */
exports.apiKey =
  process.env["API_KEY"] || "TEST_bTYAskEX6tD7vv6u/cZ/M4LaUSWBJ219+8S1jgFcnkk";
