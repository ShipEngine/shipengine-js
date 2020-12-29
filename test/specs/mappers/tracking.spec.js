const { expect } = require('chai');
const {
  TrackingInformation,
  TrackingEvent,
} = require('../../../cjs/models/public/Tracking');
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
    expect(result instanceof TrackingInformation).to.be.true;
  });
  describe('impossible states: api boundary validation', () => {
    it('should return undefined if events does not exist', () => {
      const trackingInfo = {
        ...query,
        tracking_number: 'abc',
        events: null,
      };
      const result = mapToTrackingInformation(trackingInfo);
      expect(result).to.be.undefined;
    });
    it('should return undefined if tracking_number does not exist', () => {
      const trackingInfo = {
        ...query,
        tracking_number: undefined,
      };
      const result = mapToTrackingInformation(trackingInfo);
      expect(result).to.be.undefined;
    });
    it('should return undefined if estimated_delivery_data does not exist', () => {
      const trackingInfo = {
        ...query,
        estimated_delivery_date: undefined,
      };
      const result = mapToTrackingInformation(trackingInfo);
      expect(result).to.be.undefined;
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
    expect(result).to.be.instanceOf(TrackingEvent);
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
