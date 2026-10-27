import defaultExport, { ShipEngine as namedExport } from "shipengine-sdk";
import * as esmExports from "shipengine-sdk";

const isNode = typeof window === "undefined";

// In Node.js the tests run against the built CommonJS output, so
// `require()` of the package must return the ShipEngine class itself.
// In browsers the tests run against the ESM output, so the "CommonJS export"
// is simply the ESM module namespace.
let commonJSExport = esmExports;

beforeAll(async () => {
  if (isNode) {
    const { createRequire } = await import("node:module");
    commonJSExport = createRequire(import.meta.url)("../../cjs/index.js");
  }
});

describe("package exports", () => {
  it("should export the ShipEngine class as the default CommonJS export", () => {
    if (isNode) {
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
});
