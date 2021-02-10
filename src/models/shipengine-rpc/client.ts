import { RpcClient, RpcResponse } from 'jsonrpc-ts';

export interface ErrorDataResult {
  required?: string[]; // e.g. ["jsonrpc"] -- missing fields
  message: string;
}

export class InternalRpcClient {
  #client: RpcClient;
  constructor(apiKey: string, baseUrl: string) {
    this.#client = new RpcClient({
      url: baseUrl,
      headers: {
        'API-Key': apiKey,
      },
    });
  }

  exec = async <Params extends Record<string, any>, ResponseResult>(
    method: string,
    params: Params
  ): Promise<RpcResponse<ResponseResult, ErrorDataResult>> => {
    const { data } = await this.#client.makeRequest({
      method: method,
      params: params,
      jsonrpc: '2.0',
    });
    return data;
  };
}
