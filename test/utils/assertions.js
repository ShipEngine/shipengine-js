const { expect } = require("chai");

const assertNoErrors = (response) => {
  assertEmptyArray(response.info);
  assertEmptyArray(response.warnings);
  assertEmptyArray(response.errors);
};

const assertEmptyArray = (value) => {
  expect(value).to.be.an("array");
  expect(value.length).to.equal(0);
};

const assertString = (value) => {
  expect(value).to.be.a("string");
};

const assertNormalizedAddressFormat = (normalizedAddress) => {
  expect(normalizedAddress).to.be.an("object");
  assertString(normalizedAddress.country);
  assertString(normalizedAddress.cityLocality);
  assertString(normalizedAddress.stateProvince);
  assertString(normalizedAddress.postalCode);
};

const assertNormalizedAddressMatchesOriginal = (normalizedAddress) => {
  expect(normalizedAddress.country).to.equal(
    normalizedAddress.country.toUpperCase()
  );
  expect(normalizedAddress.street[0]).to.equal(
    normalizedAddress.street[0].toUpperCase()
  );
  expect(normalizedAddress.cityLocality).to.equal(
    normalizedAddress.cityLocality.toUpperCase()
  );
  expect(normalizedAddress.postalCode).to.equal(normalizedAddress.postalCode);
  expect(normalizedAddress.stateProvince).to.equal(
    normalizedAddress.stateProvince.toUpperCase()
  );
};

module.exports = {
  assertNoErrors,
  assertString,
  assertEmptyArray,
  assertNormalizedAddressFormat,
  assertNormalizedAddressMatchesOriginal,
};
