// https://mochajs.org/#root-hook-plugins
exports.mochaHooks = {
  /**
   * Perform one-time setup before any tests are run.
   */
  before() {
    // TODO: Add any logic needed to initialize the test environment
  },

  /**
   * Reset the test environment before each test.
   */
  beforeEach() {
    console.log('tests!');
    // TODO: Add any logic needed to reset the test environment before each test
  },
};
