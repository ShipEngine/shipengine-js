const { expect } = require('chai');
const { ISOString } = require('../../../cjs/models/public');
const {
  TrackingInformation,
  TrackingStatus,
  getEventsMixin,
} = require('../../../cjs/models/public/Tracking');

describe('getEventInfo mixin', () => {
  it('should sort by latest event first', () => {
    const shouldBeLatest = new ISOString('2020-01-01');

    const { latestEvent } = getEventsMixin([
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
  it('should return the og events', () => {
    const a = [
      {
        dateTime: new ISOString('2019-12-31'),
      },
    ];
    const { events } = getEventsMixin(a);
    expect(events).to.deep.eq(a);
  });
  it('should get latest deliveredAt item', () => {
    const lastDelivered = new ISOString('2020-01-01');
    const { deliveredAt } = getEventsMixin([
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
  it('should get shippedAt item', () => {
    const _shippedAt = new ISOString('2020-01-01');
    const { shippedAt } = getEventsMixin([
      {
        dateTime: _shippedAt,
        status: TrackingStatus.Accepted,
      },
      {
        dateTime: new ISOString('2020-01-01'),
        status: TrackingStatus.InTransit,
      },
      {
        dateTime: new ISOString('2020-01-01'),
        status: TrackingStatus.Delivered,
      },
    ]);
    expect(_shippedAt.value).to.eq(shippedAt.value);
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
    const keys = Object.keys(result).sort();
    expect(keys).to.include.members(
      ['trackingNumber', 'estimatedDelivery'].sort()
    );

    // events mixin
    expect(keys).to.include.members(['latestEvent', 'deliveredAt'].sort());
  });
});
