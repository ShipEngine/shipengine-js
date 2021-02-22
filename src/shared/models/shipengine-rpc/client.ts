import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { hasProperties, isObject } from '../../../utils';

type ErrorData =
  | {
      required: string[];
    }
  | string; // message

export interface JsonRpcReply<Data> {
  jsonrpc: '2.0';
  id: string;
  result: Data;
  error?: {
    code: number;
    message: string;
    data: ErrorData;
  };
}

function assertJsonRpcReply<T>(v: unknown): asserts v is JsonRpcReply<T> {
  if (!isObject(v)) {
    throw Error('Response is not object');
  }
  if (!hasProperties(v, 'jsonrpc', 'id')) {
    throw Error(`Invalid response ${JSON.stringify(v, undefined, 2)}`);
  }
  if (hasProperties(v, 'result', 'error')) {
    throw Error(
      'Result and error member should not exist together (https://www.jsonrpc.org/specification#5)'
    );
  }
  if (hasProperties(v, 'error')) {
    if (!isObject(v.error)) {
      throw Error('Error not object');
    }
    if (!hasProperties(v.error, 'code', 'message', 'data')) {
      throw Error(
        `Invalid error shape: ${JSON.stringify(v.error, undefined, 2)}`
      );
    }
  }
}

type Params = Record<string, any>;

export class JsonRpcCall<P extends Params> {
  public jsonrpc = '2.0';
  constructor(public method: string, public params: P, public id = uuidv4()) {}
}
export class InternalRpcClient {
  #client: AxiosInstance;
  constructor(apiKey: string, baseUrl = 'http://localhost:8500') {
    this.#client = axios.create({
      baseURL: baseUrl,
      url: '/',
      headers: {
        'API-Key': apiKey,
      },
    });
  }

  exec = async <P extends Params, Data>(method: string, params: P) => {
    try {
      const data = new JsonRpcCall(method, params);
      const axiosResponse: AxiosResponse<unknown> = await this.#client({
        method: 'post',
        data,
      });
      const result = axiosResponse.data;
      assertJsonRpcReply<Data>(result);
      return result;
    } catch (err) {
      console.log(err);
    }
  };
}
