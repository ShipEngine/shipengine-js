import * as assert from "./utils/assert";

/**
 * Configures the ShipEngine API client.
 */
export interface ShipEngineConfig {
  /**
   * Your ShipEngine API key.
   *
   * This can be a production or sandbox key. Sandbox keys start with "TEST_".
   */
  apiKey: string;

  /**
   * The URL of the ShipEngine API. You can usually leave this unset and it will
   * default to our public API.
   */
  baseURL?: string | URL;

  /**
   * Some ShipEngine API endpoints return paged data. This lets you control the
   * number of items returned per request. Larger numbers will use more memory
   * but will require fewer HTTP requests.
   *
   * Defaults to 50.
   */
  pageSize?: number;

  /**
   * If the ShipEngine client receives a rate limit error it can automatically
   * retry the request after a few seconds. This setting lets you control how
   * many times it will retry before giving up.
   *
   * Defaults to 1, which means up to 2 attempts will be made (the original
   * attempt, plus one retry).
   */
  retries?: number;

  /**
   * The maximum amount of time (in milliseconds) to wait for a response from
   * the ShipEngine server.
   *
   * Defaults to 5000 (5 seconds).
   */
  timeout?: number;
}

/**
 * Normalized and sanitized config settings.
 */
export class NormalizedConfig {
  public apiKey: string;
  public baseURL: URL;
  public pageSize: number;
  public retries: number;
  public timeout: number;

  public constructor(config: string | ShipEngineConfig) {
    if (typeof config === "string") {
      // Only an API key was specified
      config = { apiKey: config };
    }

    assert.isPOJO("Config", config);

    // API Key
    assert.isNonWhitespaceString("API Key", config.apiKey);
    this.apiKey = config.apiKey;

    // Base URL
    if (config.baseURL instanceof URL) {
      this.baseURL = config.baseURL;
    } else {
      assert.isNonWhitespaceString("Base URL", config.baseURL);
      this.baseURL = new URL(config.baseURL);
    }

    // Page Size
    assert.isPositiveInteger("Page Size", config.pageSize);
    this.pageSize = config.pageSize;

    // Retries
    assert.isPositiveInteger("Retries", config.retries);
    this.retries = config.retries;

    // Timeout
    assert.isPositiveInteger("Timeout", config.timeout);
    this.timeout = config.timeout;
  }

  /**
   * Merges a base configuration and overrides, returning a new NormalizedConfig object.
   */
  public static merge(
    baseConfig: ShipEngineConfig,
    overrides?: ShipEngineConfig
  ): NormalizedConfig {
    return new NormalizedConfig({ ...baseConfig, ...overrides });
  }
}
