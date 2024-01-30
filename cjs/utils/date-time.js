"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ISOString = void 0;
/**
 *
 *  Class representing an ISOString.
 */
class ISOString {
    /**
     * Create an ISOString
     * @param value - date
     *  example:
     *  - 2020-01-01
     *  - 2020-01-01T23:00
     *  - 2020-01-01T20:00:05+05:00
     */
    constructor(value) {
        this.value = value;
        this.hasTime = /[0-9]*T[0-9]*/.test(value);
        this.hasTimeZone = /(?<=T).*[+-][0-9]|Z/.test(value);
    }
    toString() {
        return this.value;
    }
}
exports.ISOString = ISOString;
//# sourceMappingURL=date-time.js.map