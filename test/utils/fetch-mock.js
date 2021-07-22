const { host } = require("@jsdevtools/host-environment");
const fetchMock = require("fetch-mock");

// The browser version of Fetch-Mock uses ESM, so we need to use the default export
module.exports = host.browser ? fetchMock.default : fetchMock;
