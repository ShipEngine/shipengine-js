"use strict";

/**
 * The URL of the ShipEngine API to use for testing.
 * If not set, it will default to the public ShipEngine API.
 */
exports.baseURL =
  process.env["BASE_URL"] ||
  // "https://shipengine-web-api.herokuapp.com/jsonrpc/";
  "http://localhost:4000/jsonrpc/";

/**
 * The API key to use for testing. If not set, it defaults to a dummy key.
 */
exports.apiKey = process.env["API_KEY"] || "req1_foobar_sim";
