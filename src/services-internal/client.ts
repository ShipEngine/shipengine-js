import fetch from 'isomorphic-unfetch';

type ClientOptions = {
  data?: any;
} & RequestInit;

/**
 * Make fetch more like axios
 */
const Client = <Data = any>(
  baseUrl: string,
  baseConfig: ClientOptions = {}
) => (
  endpoint: string,
  { data, ...customConfig }: ClientOptions = {}
): Promise<Data> => {
  const config: RequestInit = {
    ...baseConfig,
    ...customConfig,
    headers: {
      'Content-Type': 'application/json',
      ...baseConfig.headers,
      ...customConfig.headers,
    },
  };
  if (data) {
    config.body = JSON.stringify(data);
  }
  return fetch(`${baseUrl}/${endpoint}`, config).then(async (response) => {
    const data = await response.json();
    // assumes that this will always return json.
    if (response.ok) {
      return data;
    }
    return Promise.reject(data);
  });
};

export { Client };
