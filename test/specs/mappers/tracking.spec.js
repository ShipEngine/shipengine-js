// @ts-check
const { expect } = require('chai');
const { TrackingInformation } = require('../../../cjs/models/public/Tracking');
const {
  mapToTrackingInformation,
} = require('../../../cjs/models/mappers/tracking');

describe('mapToTrackingInformation', () => {
  const trackingUSPS = require('../../../simengine/v1/responses/tracking/usps.json');
  it('should return a tracking information object', () => {
    const trackingInfo = {
      ...trackingUSPS,
      tracking_number: 'abc',
    };
    const result = mapToTrackingInformation(trackingInfo);
    expect(result instanceof TrackingInformation).to.be.true;
  });
  it('should work if events is null', () => {
    const trackingInfo = {
      ...trackingUSPS,
      tracking_number: 'abc',
      events: null,
    };
    const result = mapToTrackingInformation(trackingInfo);
    expect('latestEvent' in result).to.be.true;
  });
});
