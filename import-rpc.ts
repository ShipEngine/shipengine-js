import axios from 'axios';
import rpc from './simengine/rpc/rpc.json';
const main = async () => {
  try {
    const { data } = await axios.put(
      'http://localhost:8888/api/v2/simulation',
      rpc
    );
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

void main();

export {};
