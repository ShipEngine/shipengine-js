const { expect } = require('chai');
const {
  ShipEngineApiClient,
} = require('../../cjs/services/shipengine-api-factory');

const defaultOpts = {
  apiKey: 'abc123',
  requestOptions: { baseURL: 'http://foo.com' },
};
describe('client', () => {
  it('should instantiate a client with a specific baseUrl', () => {
    const r = ShipEngineApiClient({
      ...defaultOpts,
      requestOptions: { baseURL: 'http://foo.com' },
    });
    expect(r.defaults.baseURL).to.eq('http://foo.com');
  });
  it('should default to a base url if none is passed', () => {
    const r = ShipEngineApiClient({
      ...defaultOpts,
      requestOptions: { baseURL: undefined },
    });
    expect(r.defaults.baseURL).to.eq('https://api.shipengine.com/v1');
  });
  it('should set api key as a header', () => {
    const r = ShipEngineApiClient({
      ...defaultOpts,
      apiKey: 'helloworld',
    });
    expect(r.defaults.headers['API-Key']).to.eq('helloworld');
  });
  it('should throw error if no api key', () => {
    expect(() => {
      ShipEngineApiClient({
        ...defaultOpts,
        apiKey: undefined,
      });
    }).to.Throw();
  });
  it('should default to exponential backoff', () => {
    const r = ShipEngineApiClient({
      ...defaultOpts,
      requestOptions: {
        raxConfig: {},
      },
    });
    expect(r.defaults.raxConfig.backoffType).to.eql('exponential');
  });
  it('backoffType should be overridable', () => {
    const r = ShipEngineApiClient({
      ...defaultOpts,
      requestOptions: {
        raxConfig: {
          backoffType: 'linear',
        },
      },
    });
    expect(r.defaults.raxConfig.backoffType).to.eql('linear');
  });
});
