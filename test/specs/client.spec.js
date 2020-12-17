const { expect } = require('chai');
const {
  ShipEngineApiClient,
} = require('../../cjs/services/shipengine-api-factory');

const defaultCfg = { baseUrl: 'http://foo.com' };

describe('client', () => {
  it('should instantiate a client with a specific baseUrl', () => {
    const r = ShipEngineApiClient('abc', defaultCfg);
    expect(r.defaults.baseURL).to.eq(defaultCfg.baseUrl);
  });
  it('should default to a base url if none is passed', () => {
    const r = ShipEngineApiClient('abc', { baseUrl: undefined });
    expect(r.defaults.baseURL).to.eq('https://api.shipengine.com/v1');
  });
  it('should set api key as a header', () => {
    const r = ShipEngineApiClient('helloworld');
    expect(r.defaults.headers['API-Key']).to.eq('helloworld');
  });
  it('should throw error if no api key', () => {
    try {
      ShipEngineApiClient(undefined);
      expect.fail('should not reach here.');
    } catch (err) {
      expect(err.message).to.match(/key/i);
    }
  });
  it('should default to exponential backoff', () => {
    const r = ShipEngineApiClient('abc');
    expect(r.defaults.raxConfig.backoffType).to.eql('exponential');
  });
  it('backoffType should be overridable', () => {
    const r = ShipEngineApiClient('abc', {
      retryBackoffType: 'linear',
    });
    expect(r.defaults.raxConfig.backoffType).to.eql('linear');
  });
});
