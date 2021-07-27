"use strict";

const fs = require("fs");
const path = require("path");
// const { ShipEngine } = require("../../");
// const { apiKey, baseURL } = require("../utils/constants");
// const { expect } = require("chai");
// const sinon = require("sinon");
// const pjson = require("../../package.json");

describe("exports and versions", () => {
  it("should export all of the error classes", () => {
    assertFileExports("src/errors");
  });

  // TODO - test this w/ out events
  // it("should send the current SDK version in the user agent", async () => {
  //   const shipengine = new ShipEngine({ apiKey, baseURL });

  //   // Subscribe to the request/response events
  //   const requestSent = sinon.spy();
  //   shipengine.on("requestSent", requestSent);

  //   // Call a method that should trigger a single request & response
  //   await shipengine.validateAddress({
  //     name: "John Smith",
  //     addressLineOne: "3910 Bailey Lane",
  //     cityLocality: "Austin",
  //     stateProvince: "TX",
  //     postalCode: "78756",
  //     country: "US",
  //     isResidential: true,
  //   });

  //   const userAgentString =
  //     requestSent.firstCall.firstArg.headers["User-Agent"];

  //   expect(userAgentString).to.be.a("string").and.contains(pjson.version);
  // });
});

function assertFileExports(dir, exceptions = []) {
  // Always exclude these files.
  exceptions.push("index.ts", ".DS_STORE", "Thumbs.db");

  let indexPath = path.join(dir, "index.ts");
  let exports = fs.readFileSync(indexPath, "utf8");
  let files = fs.readdirSync(dir);
  let missingFiles = [];
  let extraFiles = [];

  for (let file of files) {
    let moduleName = path.posix.join(
      path.dirname(file),
      path.basename(file, ".ts")
    );
    let isExported = exports.includes(`from "./${moduleName}"`);
    let shouldBeExported = !exceptions.some((ex) => file.startsWith(ex));

    if (isExported && !shouldBeExported) {
      extraFiles.push(file);
    } else if (!isExported && shouldBeExported) {
      missingFiles.push(file);
    }
  }

  if (missingFiles.length > 0 || extraFiles.length > 0) {
    let messages = [];

    if (missingFiles.length > 0) {
      messages.push(
        `${indexPath} is missing the following exports:\n  - ` +
          missingFiles.join("\n  - ")
      );
    }

    if (extraFiles.length > 0) {
      messages.push(
        `${indexPath} should NOT export these files:\n  - ` +
          extraFiles.join("\n  - ")
      );
    }

    throw new Error(`\n\n${messages.join("\n\n")}\n\n`);
  }
}
