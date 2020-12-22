// @ts-check
const { expect } = require('chai');
const { TrackingInformation } = require('../../../cjs/models/public/Tracking');
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
  it('should work if events is null', () => {
    const trackingInfo = {
      ...query,
      tracking_number: 'abc',
      events: null,
    };
    const result = mapToTrackingInformation(trackingInfo);
    expect('latestEvent' in result).to.be.true;
  });
});

describe('mapToTrackEvents', () => {
  const [ev1, ev2] = query.events;

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
  /*   it('should work if events is null', () => {
    const trackingInfo = {
      ...,
      tracking_number: 'abc',
      events: null,
    };
    const result = mapToTrackingInformation(trackingInfo);
    expect('latestEvent' in result).to.be.true;
  }); */
});
