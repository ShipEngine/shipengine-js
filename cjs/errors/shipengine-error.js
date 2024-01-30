"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipEngineError = void 0;
/**
 * An error thrown by the ShipEngine SDK.
 * All other SDK errors inherit from this class.
 */
class ShipEngineError extends Error {
    constructor(...args) {
        let requestID, source, type, code, message, url;
        // Determine which overload was called
        if (args.length >= 5) {
            requestID = args[0];
            source = args[1];
            type = args[2];
            code = args[3];
            message = args[4];
            url = args[5];
        }
        else {
            source = "shipengine";
            type = args[0];
            code = args[1];
            message = args[2];
            url = args[3];
        }
        super(message);
        this.name = new.target.name;
        this.source = source;
        this.type = type;
        this.code = code;
        this.requestID = requestID;
        this.url = new URL(url || "https://www.shipengine.com/docs/errors/codes/");
    }
    /**
     * Converts the error object to a POJO that can easily be logged or serialized.
     */
    toJSON() {
        return {
            ...this,
            name: this.name,
            message: this.message,
            stack: this.stack,
        };
    }
}
exports.ShipEngineError = ShipEngineError;
//# sourceMappingURL=shipengine-error.js.map