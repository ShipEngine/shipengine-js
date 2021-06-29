"use strict";

const fs = require("fs");
const path = require("path");

describe("file specific exports", () => {
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
