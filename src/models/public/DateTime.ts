/**
 *
 *  Class representing an ISOString.
 */
export class ISOString {
  value: string;

  /**
   * Create an ISOString
   * @param value - date
   *  example:
   *  - 2020-01-01
   *  - 2020-01-01T23:00
   *  - 2020-01-01T20:00:05+05:00
   */
  constructor(value: string) {
    this.value = value;
  }

  /**
   * does the value include the time (e.g.T23:00)?
   */
  get hasTime(): boolean {
    return true;
  }

  /**
   * does the value include a time zone designator (e.g.+05:00)?
   * The time zone designator will is represented as UTC offset.
   */
  get hasTimeZone(): boolean {
    return true;
  }
}
