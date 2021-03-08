export interface ValidateAddressParamsItemDto {
  street: string[];
  countryCode: null | string;
  cityLocality?: null | string;
  latitude?: number | null;
  longitude?: number | null;
  postalCode?: null | string;
  stateProvince?: null | string;
}

export type ValidateAddressParamsDto = ValidateAddressParamsItemDto[];
export interface ValidateAddressResultDto {
  address: AddressAddressResultDto | null;
  messages: MessagesDto;
}

export interface AddressAddressResultDto {
  street: string[];
  countryCode: null | string;
  cityLocality: null | string;
  latitude: number | null;
  longitude: number | null;
  postalCode: null | string;
  residential: null | boolean;
  stateProvince: null | string;
}

export interface MessagesDto {
  errors: string[];
  info: string[];
  warnings: string[];
}
