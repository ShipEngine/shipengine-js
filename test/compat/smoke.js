"use strict";

// Dependency-free smoke test for the packed SDK on older Node.js versions.
//
// The full test suite needs modern tooling that won't run on every Node.js
// version in `engines`, so CI installs the packed tarball into an empty
// directory and runs this script there with nothing but Node.js built-ins.
// Keep this file to syntax that Node.js 12 understands.

const assert = require("assert");
const http = require("http");

const sdkPath = require.resolve("shipengine", { paths: [process.cwd()] });
const shipengine = require(sdkPath);
const { ShipEngine, ShipEngineError } = shipengine;

const trackingResponse = {
  tracking_number: "1Z999",
  status_code: "DE",
  status_description: "Delivered",
  carrier_status_code: "D",
  estimated_delivery_date: null,
  events: [
    {
      occurred_at: "2021-06-17T05:04:39Z",
      description: "Delivered",
      city_locality: "AUSTIN",
      state_province: "TX",
      postal_code: "78756",
    },
  ],
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");
  const send = (status, body) => {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(body));
  };

  if (req.headers["api-key"] !== "TEST_api_key") {
    send(401, { request_id: "smoke", errors: [] });
  } else if (
    url.pathname === "/v1/tracking" &&
    url.searchParams.get("carrier_code") === "ups" &&
    url.searchParams.get("tracking_number") === "1Z999"
  ) {
    send(200, trackingResponse);
  } else {
    send(404, {
      request_id: "smoke",
      errors: [
        {
          error_source: "shipengine",
          error_type: "validation",
          error_code: "not_found",
          message: "Not found",
        },
      ],
    });
  }
});

async function main() {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const baseURL = `http://127.0.0.1:${server.address().port}/`;

  // The CommonJS export is the ShipEngine class itself, with named exports
  assert.strictEqual(typeof shipengine, "function");
  assert.strictEqual(shipengine, ShipEngine);
  assert.strictEqual(shipengine.default, ShipEngine);

  const client = new ShipEngine({ apiKey: "TEST_api_key", baseURL });

  const result = await client.trackUsingCarrierCodeAndTrackingNumber({
    carrierCode: "ups",
    trackingNumber: "1Z999",
  });
  assert.strictEqual(result.trackingNumber, "1Z999");
  assert.strictEqual(result.statusCode, "DE");
  assert.strictEqual(result.events.length, 1);
  assert.strictEqual(result.events[0].cityLocality, "AUSTIN");

  await assert.rejects(
    client.trackUsingLabelId("se-missing"),
    (error) => error instanceof ShipEngineError
  );

  console.log(`shipengine smoke test passed on Node ${process.version}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .then(() => server.close());
