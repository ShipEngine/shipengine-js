import { CarrierCode } from "../enums";

export interface CarrierAccount {
  id: string;
  carrier: Carrier;
  accountNumber: string;
  accountName: string;
}

interface RPCCarrierAccount {
  carrier_account: string;
  account_id: string;
  account_number: string;
  name: string;
}

export interface GetCarriersRPCResult {
  accounts: RPCCarrierAccount[];
}

export interface GetCarriersResult {
  accounts: Account[];
}

export interface Carrier {
  name: string;
  code: CarrierCode;
}
