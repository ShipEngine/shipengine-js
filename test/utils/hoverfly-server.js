const axios = require('axios');
const { hoverflyActualAPIPort } = require('./constants');

const client = axios.create({
  baseURL: `http://localhost:${hoverflyActualAPIPort}`,
});
class HoverflyServer {
  static async start() {
    return client.delete('/api/v2/simulation');
  }

  static async import(fileName) {
    const simulation = require(`../../simengine/${fileName}`);
    return client.put('/api/v2/simulation', simulation);
  }

  static async stop() {
    // console.log('stopping...');
  }
}

module.exports = {
  HoverflyServer,
};
