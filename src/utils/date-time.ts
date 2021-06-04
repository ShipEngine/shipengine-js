/**
 *
 *  Class representing an ISOString.
 */
export class ISOString {
  readonly hasTime: boolean;
  readonly hasTimeZone: boolean;
  readonly value: string;
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
    this.hasTime = /[0-9]*T[0-9]*/.test(value);
    this.hasTimeZone = /(?<=T).*[+-][0-9]|Z/.test(value);
  }

  toString(): string {
    return this.value;
  }
}
