import { CarrierCode } from "../enums";

export interface CarrierAccount {
  ID: string;
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
  // Do I need another enum for this?
  name: string;
  code: CarrierCode;
}
