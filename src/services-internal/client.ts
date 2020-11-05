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
  const url = `${baseUrl}${endpoint}`;
  console.log(url);
  return fetch(url, config).then(async (response) => {
    try {
      // assumes that this will always return json.
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      return data;
    } catch (err) {
      try {
        // attempt to parse error as json
        const data = await err.json();
        return Promise.reject(data);
      } catch (jsonErr) {
        return Promise.reject(err);
      }
    }
  });
};

export { Client };
