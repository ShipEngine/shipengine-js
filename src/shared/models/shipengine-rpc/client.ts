import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { v4 as uuidv4 } from 'uuid';

type ErrorData =
  | {
      required: string[];
    }
  | string; // message
export interface Result<ResponseData = any> {
  jsonrpc: '2.0';
  id: string;
  result: ResponseData;
  error?: {
    code: number;
    message: string;
    data: ErrorData;
  };
}

type Params = Record<string, any>;

export class Request<P extends Params> {
  public jsonrpc = '2.0';
  constructor(public method: string, public params: P, public id: string) {}
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

  exec = async <P extends Params, ResponseData>(method: string, params: P) => {
    const request = new Request(method, params, uuidv4());
    try {
      const axiosResponse: AxiosResponse<Result<
        ResponseData
      >> = await this.#client({
        method: 'post',
        data: request,
      });

      return axiosResponse.data;
    } catch (err) {
      console.log(err);
    }
  };
}
