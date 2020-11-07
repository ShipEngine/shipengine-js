/* eslint-env node, browser */
'use strict';

const { assert, expect } = require('chai');
const { host } = require('@jsdevtools/host-environment');

const location = host.node ? process.cwd() : window.location.href;

describe('myLibrary() API', () => {
  it('should work without any arguments', () => {
    let result = myLibrary();
    expect(result).to.equal(`Hello, world from ${location}.`);
  });
});
