import { AxiosError } from 'axios';
import { hasProperties } from '../utils';

const isObject = (v: unknown): v is object => {
  return v && typeof v === 'object';
};

/**
 * Get a simplified axios error for logging purposes.
 */
export const parseAxiosError = (err: unknown) => {
  const isAxiosError = (err: unknown): err is AxiosError => {
    if (isObject(err) && hasProperties(err, 'response', 'config')) {
      const hasResponse =
        isObject(err.response) &&
        hasProperties(err.response, 'headers', 'status', 'data');

      const hasConfig = isObject(err.config);
      return hasResponse && hasConfig;
    }
    return false;
  };
  if (!isAxiosError(err)) {
    return undefined;
  }
  return {
    response: {
      headers: err.response?.headers,
      status: err.response?.status,
      data: err.response?.data,
    },
    config: {
      baseUrl: err.config.baseURL,
      method: err.config.method,
      params: err.config.params,
    },
  };
};
