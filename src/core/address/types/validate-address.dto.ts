export interface ValidateAddressParamsDto {
  street: string[];
  countryCode: null | string;
  cityLocality?: null | string;
  postalCode?: null | string;
  stateProvince?: null | string;
}

export interface ValidateAddressResultDto {
  valid: true;
  address: AddressAddressResultDto | null;
  messages: MessagesDto;
}

export interface AddressAddressResultDto {
  street: string[];
  countryCode: null | string;
  cityLocality: null | string;
  postalCode: null | string;
  residential: null | boolean;
  stateProvince: null | string;
}

export interface MessagesDto {
  errors: string[];
  info: string[];
  warnings: string[];
}
