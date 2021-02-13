import axios, { AxiosInstance, AxiosResponse } from 'axios';

export interface ErrorDataResult {
  required?: string[]; // e.g. ["jsonrpc"] -- missing fields
  message: string;
}

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

type Parameters = Record<string, any>;

export class Request<P extends Parameters> {
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

  exec = async <P extends Parameters, ResponseData>(
    method: string,
    params: P
  ) => {
    const request = new Request(method, params, Math.random().toString());
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
