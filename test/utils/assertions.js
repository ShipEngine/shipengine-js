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

module.exports = {
  assertNoErrors,
  assertString,
  assertEmptyArray,
};
