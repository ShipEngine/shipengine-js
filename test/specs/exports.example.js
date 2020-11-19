'use strict';

const commonJSExport = require('../../esm');
const { default: defaultExport, myLibrary: namedExport } = require('../../esm');
const { expect } = require('chai');
const { host } = require('@jsdevtools/host-environment');

describe('my-package-name package exports', () => {
  it('should export the myLibrary() function as the default CommonJS export', () => {
    if (host.node) {
      expect(commonJSExport).to.be.a('function');
      expect(commonJSExport.name).to.equal('myLibrary');
    } else {
      // Browser tests are only ESM, not CommonJS
      expect(commonJSExport)
        .to.be.a('Module')
        .with.keys('default', 'myLibrary');
    }
  });

  it('should export the myLibrary() function as the default ESM export', () => {
    expect(defaultExport).to.be.a('function');
    expect(defaultExport.name).to.equal('myLibrary');
  });

  it('should export the myLibrary() function as a named export', () => {
    expect(namedExport).to.be.a('function');
    expect(namedExport.name).to.equal('myLibrary');
  });

  it('should not export anything else', () => {
    expect(commonJSExport).to.have.same.keys('default', 'myLibrary');
  });
});
