const { expect } = require('chai');
const { ShipEngineApi } = require('../../cjs/services/shipengine-api-factory');

const ogEnv = { ...process.env };
afterEach(() => {
  process.env = ogEnv;
});

const defaultOpts = {
  apiKey: 'abc123',
  requestOptions: { baseURL: 'http://foo.com' },
};
describe('client', () => {
  it('should instantiate a client with a specific baseUrl', () => {
    const r = ShipEngineApi({
      ...defaultOpts,
      requestOptions: { baseURL: 'http://foo.com' },
    });
    expect(r.defaults.baseURL).to.eq('http://foo.com');
  });
  it('should default to a base url if none is passed', () => {
    const r = ShipEngineApi({
      ...defaultOpts,
      requestOptions: { baseURL: undefined },
    });
    expect(r.defaults.baseURL).to.eq('https://api.shipengine.com/v1');
  });
  it('should be overrideable with process.env', () => {
    process.env.BASE_URL = 'http://PROCESSENV.com';
    const r = ShipEngineApi({
      ...defaultOpts,
    });
    expect(r.defaults.baseURL).to.eq(process.env.BASE_URL);
  });
  it('should set api key as a header', async () => {
    const r = ShipEngineApi({
      ...defaultOpts,
      apiKey: 'helloworld',
    });
    expect(r.defaults.headers['API-Key']).to.eq('helloworld');
  });
  it('should throw error if no api key', async () => {
    expect(() => {
      ShipEngineApi({
        ...defaultOpts,
        apiKey: undefined,
      });
    }).to.Throw();
  });
});
