const { configProxyApiPath } = require('./constants');
const axios = require('axios');

const client = axios.create({ baseURL: configProxyApiPath });

class HoverflyBrowser {
  static async start() {
    return client.post('/start');
  }
  static async import(path) {
    return client.post('/import', { path });
  }
  static async stop() {
    return client.post('/stop');
  }
}

module.exports = {
  HoverflyBrowser,
};
