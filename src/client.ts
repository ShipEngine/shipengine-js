import * as rax from 'retry-axios';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export const defaultAxiosInstance = axios.create({});
rax.attach(defaultAxiosInstance);

const defaultConfig: AxiosRequestConfig = {
  timeout: 10000,
  headers: {},
};

export type AxiosConfig = AxiosRequestConfig &
  rax.RetryConfig & { apiKey?: string };

type Config = AxiosConfig | AxiosInstance;

const isAxiosInstance = (v: Config): v is AxiosInstance => {
  return typeof v === 'function';
};

const createClient = (config?: Config) => {
  if (!config) return defaultAxiosInstance;
  if (isAxiosInstance(config)) {
    const instance = config;
    instance.defaults.headers = {
      ...defaultConfig.headers,
      ...config.defaults.headers,
    };
    return instance;
  }
  const instance = axios.create({
    ...defaultConfig,
    ...config,
  });
  rax.attach(instance);
  return instance;
};

export { createClient };
