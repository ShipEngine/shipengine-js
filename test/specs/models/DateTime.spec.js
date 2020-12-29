const { expect } = require('chai');
const { ISOString } = require('../../../cjs/models/public');

describe('ISOString', () => {
  it('should handle scenario where only date is provided', () => {
    const v = '2020-01-01';
    const t = new ISOString(v);
    expect(t).to.deep.eq({
      value: v,
      hasTime: false,
      hasTimeZone: false,
    });
  });

  it('should handle scenario where date and time is provided', () => {
    const v = '2020-12-10T16:34:00';
    const t = new ISOString(v);
    expect(t).to.deep.eq({
      value: v,
      hasTime: true,
      hasTimeZone: false,
    });
  });

  it('should handle scenario where date and time and timezone is provided', () => {
    const v = '2020-12-05T20:24:00Z';
    const t = new ISOString(v);
    expect(t).to.deep.eq({
      value: v,
      hasTime: true,
      hasTimeZone: true,
    });
  });

  it('should have toString() method', () => {
    const v = '2020-12-05';
    const t = `${new ISOString(v)}`;
    expect(v).to.eq(t);
  });
});
