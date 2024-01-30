import { ShipEngineError } from "./errors";
import * as assert from "./utils/assert";
/**
 * Normalized and sanitized config settings.
 */
export class NormalizedConfig {
    constructor(config) {
        if (typeof config === "string") {
            // Only an API key was specified
            config = { apiKey: config };
        }
        if (!config ||
            (typeof config.apiKey === "string" && config.apiKey.trim().length === 0)) {
            throw new ShipEngineError("validation", "field_value_required", "A ShipEngine API key must be specified.");
        }
        assert.isPOJO("Config", config);
        // API Key
        assert.isNonWhitespaceString("API Key", config.apiKey);
        this.apiKey = config.apiKey;
        // Make request on behalf of child account (partner API)
        if (config.onBehalfOf) {
            assert.isNonWhitespaceString("On Behalf of API Key", config.onBehalfOf);
            this.onBehalfOf = config.onBehalfOf;
        }
        // Base URL
        if (config.baseURL instanceof URL) {
            this.baseURL = config.baseURL;
        }
        else if (config.baseURL) {
            assert.isNonWhitespaceString("Base URL", config.baseURL);
            this.baseURL = new URL(config.baseURL);
        }
        else {
            this.baseURL = new URL("https://api.shipengine.com/");
        }
        // Page Size
        if (config.pageSize === undefined) {
            this.pageSize = 50;
        }
        else {
            assert.isPositiveInteger("Page Size", config.pageSize);
            this.pageSize = config.pageSize;
        }
        // Retries
        if (config.retries === undefined) {
            this.retries = 1;
        }
        else {
            assert.isNonNegativeInteger("Retries", config.retries);
            this.retries = config.retries;
        }
        // Timeout
        if (config.timeout === undefined) {
            this.timeout = 5000;
        }
        else {
            assert.isPositiveInteger("Timeout", config.timeout);
            this.timeout = config.timeout;
        }
    }
    /**
     * Merges a base configuration and overrides, returning a new NormalizedConfig object.
     */
    static merge(baseConfig, overrides) {
        if (overrides) {
            assert.isPOJO("Config", overrides);
        }
        return new NormalizedConfig({ ...baseConfig, ...overrides });
    }
}
//# sourceMappingURL=config.js.map