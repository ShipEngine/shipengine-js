const { expect } = require('chai');
const {
  mapToTrackingInformation,
  mapToTrackEvents,
} = require('../../../cjs/models/mappers/tracking');

const query = require('../../../simengine/v1/responses/tracking/query.json');
describe('mapToTrackingInformation', () => {
  it('should return a tracking information object', () => {
    const trackingInfo = {
      ...query,
      tracking_number: 'abc',
    };
    const result = mapToTrackingInformation(trackingInfo);
    expect(result.trackingNumber).to.eq('abc');
    expect(result.events).to.have.length;
  });
  describe('impossible states: api boundary validation', () => {
    it('should throw error', () => {
      const trackingInfo = {
        ...query,
        events: [],
        carrier_status_description: 'Invalid Tracking Information',
        estimated_delivery_date: undefined,
      };
      try {
        mapToTrackingInformation(trackingInfo);
        expect.fail('should not reach here');
      } catch (err) {
        expect(typeof err.message).to.eq('string');
      }
    });
  });
});

describe('mapToTrackEvents', () => {
  const [ev1] = query.events;

  it('should return empty location if location is empty (and vice versa)', () => {
    const result1 = mapToTrackEvents({ ...ev1, city_locality: 'foo' });
    expect(result1.location).not.to.be.undefined;

    const evcp = { ...ev1 };
    evcp.city_locality = null;
    evcp.latitude = null;
    evcp.longitude = null;
    evcp.postal_code = null;
    evcp.country_code = null;
    const result2 = mapToTrackEvents({ ...evcp });
    expect(result2.location).to.be.undefined;
  });
  it('should use undefined instead of null', () => {
    for (const k in query.events) {
      const result = mapToTrackEvents({ ...query.events[k] });
      expect(JSON.stringify(result)).to.not.contain('null');
    }
  });
  it('should return a track events instance', () => {
    const result = mapToTrackEvents(ev1);
    const parsed = {
      info: [{ type: 'info', message: 'On FedEx vehicle for delivery' }],
      warnings: [],
      errors: [],
      location: {
        cityLocality: 'AUSTIN',
        country: 'US',
        latitude: 30.1356,
        longitude: -97.6761,
        postalCode: '78744',
      },
      dateTime: {
        value: '2020-12-10T11:59:00Z',
        hasTime: true,
        hasTimeZone: true,
      },
      status: 'IT',
      description: 'In Transit',
      carrierStatusCode: 'OD',
      carrierDetailCode: 'On delivery vehicle',
    };
    expect(result).to.deep.eq(parsed);
  });
});
