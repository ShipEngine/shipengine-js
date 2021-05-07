"use strict";

const { expect } = require("chai");

module.exports = {
  assertAddressEquals(actual, expected) {
    expect(actual.name).to.equal(expected.name);
    expect(actual.company).to.equal(expected.company);
    expect(actual.phone).to.equal(expected.phone);
    expect(actual.street).to.deep.equal(expected.street);
    expect(actual.cityLocality).to.equal(expected.cityLocality);
    expect(actual.stateProvince).to.equal(expected.stateProvince);
    expect(actual.postalCode).to.equal(expected.postalCode);
    expect(actual.country).to.equal(expected.country);
    if ("isResidential" in expected) {
      expect(actual.isResidential).to.equal(expected.isResidential);
    }
  },

  assertNormalizedAddressFormat(normalizedAddress) {
    expect(normalizedAddress)
      .to.be.an("object")
      .with.keys(
        "cityLocality",
        "company",
        "country",
        "isResidential",
        "name",
        "phone",
        "postalCode",
        "stateProvince",
        "street",
        "toString"
      );
    if (normalizedAddress.isResidential !== undefined) {
      expect(normalizedAddress.isResidential).to.be.a("boolean");
    }
    expect(normalizedAddress.cityLocality).to.be.a("string");
    expect(normalizedAddress.company).to.be.a("string");
    expect(normalizedAddress.country).to.be.a("string");
    expect(normalizedAddress.name).to.be.a("string");
    expect(normalizedAddress.phone).to.be.a("string");
    expect(normalizedAddress.postalCode).to.be.a("string");
    expect(normalizedAddress.stateProvince).to.be.a("string");
    expect(normalizedAddress.street).to.be.a("array");
    expect(normalizedAddress.toString).to.be.a("function");
  },

  assertNoWarningsOrErrorMessages(response) {
    expect(response.info).to.be.an("array").and.be.empty;
    expect(response.warnings).to.be.an("array").and.be.empty;
    expect(response.errors).to.be.an("array").and.be.empty;
  },
};
