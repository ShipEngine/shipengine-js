export interface CarrierAccount {
  id: string;
  carrier: Carrier;
  accountNumber: string;
  name: string;
}

export interface Carrier {
  name: string;
  code: string;
}
