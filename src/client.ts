import * as rax from 'retry-axios';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const defaultConfig: AxiosRequestConfig = {
  timeout: 10000,
  headers: {},
  raxConfig: {
    // Retry 3 times on requests that return a response (500, etc) before giving up.  Defaults to 3.
    retry: 3,

    // Retry twice on errors that don't return a response (ENOTFOUND, ETIMEDOUT, etc).
    noResponseRetries: 2,

    // Milliseconds to delay at first.  Defaults to 100. Only considered when backoffType is 'static'
    retryDelay: 100,

    httpMethodsToRetry: ['GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT', 'POST'],

    // The response status codes to retry.  Supports a double
    // array with a list of ranges.  Defaults to:
    // [[100, 199], [429, 429], [500, 599]]
    statusCodesToRetry: [
      [100, 199],
      [429, 429],
      [500, 599],
    ],

    // If you are using a non static instance of Axios you need
    // to pass that instance here (const ax = axios.create())
    // instance: axios.create(),

    // You can set the backoff type.
    // options are 'exponential' (default), 'static' or 'linear'
    backoffType: 'exponential',

    // You can detect when a retry is happening, and figure out how many
    // retry attempts have been made
    onRetryAttempt: (err) => {
      const cfg = rax.getConfig(err);
      console.log(
        `Status: ${err.code}, Retry attempt #${cfg?.currentRetryAttempt}`
      );
    },
  },
};

export type AxiosConfig = AxiosRequestConfig &
  rax.RetryConfig & { apiKey?: string };

type Config = AxiosConfig | AxiosInstance;

const isAxiosInstance = (v: Config): v is AxiosInstance => {
  return typeof v === 'function';
};

const createClient = (config: Config) => {
  if (isAxiosInstance(config)) {
    const instance = config;
    instance.defaults = {
      ...instance.defaults,
      ...config.defaults,
      ...defaultConfig,
      headers: {
        ...defaultConfig.headers,
        ...config.defaults.headers,
      },
    };
    return instance;
  }
  const finalConfig = {
    ...defaultConfig,
    ...config,
    headers: {
      ...defaultConfig.headers,
      ...config.headers,
    },
  };
  const instance = axios.create(finalConfig);
  rax.attach(instance);
  return instance;
};

export { createClient };
