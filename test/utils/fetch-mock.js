// Importing the SDK first guarantees that it has finished installing its own
// `globalThis.fetch` (node-fetch in Node.js) before fetch-mock replaces it.
import "shipengine-sdk";
import fetchMock from "fetch-mock";

// Route all `fetch` calls (node-fetch in Node.js, native fetch in browsers)
// through fetch-mock.
fetchMock.mockGlobal();

/**
 * Removes all routes and call history between tests.
 * (Equivalent to the `restore()` method of fetch-mock v9.)
 */
fetchMock.restore = () => {
  fetchMock.removeRoutes();
  fetchMock.clearHistory();
};

export default fetchMock;
