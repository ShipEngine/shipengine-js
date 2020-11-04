import { Client } from './client';
// silly -- maybe we can use it to actually consume v1 shipEngine routes... so essentially we are wrapping generated code.
export const ShipEngine = (apiKey = 'foo') =>
  Client('https://api.shipengine.com', {
    headers: {
      Host: 'api.shipengine.com',
      'API-Key': apiKey,
    },
  });
