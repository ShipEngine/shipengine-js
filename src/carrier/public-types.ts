export interface CarrierAccount {
  id: string;
  carrier: Carrier;
  accountNumber: string;
  accountName: string;
}

export interface ListCarriersResult {
  accounts: CarrierAccount[];
}

export interface Carrier {
  name: string;
  code: string;
}
