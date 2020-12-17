import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import type { RetryConfig } from 'retry-axios';

export type AxiosConfig = AxiosRequestConfig &
  RetryConfig & { apiKey?: string };

export type CustomAxiosClientConfig = AxiosConfig | AxiosInstance;

export type RetryBackOffType = 'linear' | 'static' | 'exponential';
