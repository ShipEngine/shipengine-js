"use strict";

const fs = require("fs");
const path = require("path");
const commonJSExport = require("../../");
const { default: defaultExport, ShipEngine: namedExport } = require("../../");
const { expect } = require("chai");
const { host } = require("@jsdevtools/host-environment");

describe("package exports", () => {
  it("should export the ShipEngine class as the default CommonJS export", () => {
    if (host.node) {
      expect(commonJSExport).to.be.a("function");
      expect(commonJSExport.name).to.equal("ShipEngine");
    } else {
      // Browser tests are only ESM, not CommonJS
      expect(commonJSExport).to.be.a("Module").that.includes.keys("default");
    }
  });

  it("should export the ShipEngine class as the default ESM export", () => {
    expect(defaultExport).to.be.a("function");
    expect(defaultExport.name).to.equal("ShipEngine");
  });

  it("should export the ShipEngine class as a named export", () => {
    expect(namedExport).to.be.a("function");
    expect(namedExport.name).to.equal("ShipEngine");
  });

  it("should only export enumerations and classes", () => {
    // Loop through all of the named exports
    for (let [name, namedExport] of Object.entries(commonJSExport)) {
      // Ignore the default export
      if (name === "default") continue;

      expect(name).to.match(
        /^([A-Z][a-z]*)+$/,
        `The "${name}" export should be PascalCase`
      );

      if (typeof namedExport === "object") {
        // Verify that this is an enumeration.
        // That is, it only contains strings or numbers.
        let enumValues = Object.values(namedExport);
        let enumType = typeof enumValues[0];

        for (let value of enumValues) {
          expect(value).to.be.a(
            enumType,
            `The "${name}" export is not an enumeration`
          );
        }
      } else {
        // Verify that this is a class
        expect(namedExport).to.be.a(
          "function",
          `The "${name}" export is not an enumeration or class`
        );
        expect(namedExport.name).to.equal(
          name,
          `The "${name}" export is not an enumeration or class`
        );
      }
    }
  });

  it("should export all of the enumerations", () => {
    assertFileExports("src/enums");
  });

  it("should export all of the error classes", () => {
    assertFileExports("src/errors");
  });
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
