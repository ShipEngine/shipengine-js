import { AxiosInstance } from 'axios';

export interface IAddressService {
  get(): Promise<string[]>;
  create(tagName: string): Promise<string>;
}

/**
 * Publicly-accessible service for anything related to tags
 */
export class AddressService {
  private client: AxiosInstance;
  constructor(client: AddressService['client']) {
    this.client = client;
  }
  public getConvenienceAPI() {
    return {
      validateAddress: this.validate,
    };
  }
  public getAdvancedAPI() {
    return {
      address: {
        validate: this.validate,
      },
    };
  }
  private async validate(address: any) {
    const { data } = await this.client.post<string>(`/tags/`, address);
    return data;
  }
}
