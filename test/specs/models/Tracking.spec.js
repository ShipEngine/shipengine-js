// @ts-check
const { expect } = require('chai');
const { ISOString } = require('../../../cjs/models/public');
const {
  TrackingInformation,
  TrackingStatus,
  getEventsInfo,
} = require('../../../cjs/models/public/Tracking');

describe('getEventInfo mixin', () => {
  it('should sort by latest event first', () => {
    const shouldBeLatest = new ISOString('2020-01-01');

    const { latestEvent } = getEventsInfo([
      {
        dateTime: new ISOString('2019-12-31'),
      },
      {
        dateTime: shouldBeLatest,
      },
      { dateTime: new ISOString('2019-12-10T07:10:00') },
      { dateTime: new ISOString('2019-12-01') },
    ]);
    expect(latestEvent.dateTime.value).to.eq(shouldBeLatest.value);
  });
  it('should get latest deliveredAt item', () => {
    const lastDelivered = new ISOString('2020-01-01');
    const { deliveredAt } = getEventsInfo([
      {
        dateTime: new ISOString('2019-12-31'),
      },
      {
        dateTime: new ISOString('2020-01-01'),
        status: TrackingStatus.Exception,
      },
      {
        dateTime: lastDelivered,
        status: TrackingStatus.Delivered,
      },
      {
        dateTime: new ISOString('2019-12-10T07:10:00'),
        status: TrackingStatus.Delivered,
      },
    ]);
    expect(deliveredAt.value).to.eq(lastDelivered.value);
  });
});

describe('TrackingInformation', () => {
  it('should contain fields and be iterable', () => {
    const estDeliv = '2020-12-10T13:10:00Z';
    const trackingInfo = 'abc123';
    const events = [];
    const result = {
      ...new TrackingInformation(trackingInfo, new ISOString(estDeliv), events),
    };
    expect(result.trackingNumber).to.eq(trackingInfo);
    expect(Object.keys(result)).to.include.members([
      'shippedAt',
      'estimatedDelivery',
      'deliveredAt',
    ]);
  });
});
