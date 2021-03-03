import {
  camelize,
  snakeize,
  SnakeToCamelCaseObject,
} from '../../../../../utils';
export interface ValidateAddressParamsDto {
  street: string[];
  country_code: null | string;
  city_locality?: null | string;
  latitude?: number | null;
  longitude?: number | null;
  postal_code?: null | string;
  state_province?: null | string;
}

export const toValidateAddressParamsDto = (
  v: ValidateAddressParams
): ValidateAddressParamsDto => {
  return snakeize(v);
};

export interface ValidateAddressResultDto {
  address: AddressDto | null;
  messages: MessagesDto;
}

export const toValidateAddressResult = (
  v: ValidateAddressResultDto
): ValidateAddressResult => {
  return camelize(v);
};

export interface AddressDto {
  street: string[];
  country_code: null | string;
  city_locality: null | string;
  latitude: number | null;
  longitude: number | null;
  postal_code: null | string;
  residential: null | boolean;
  state_province: null | string;
}

export interface MessagesDto {
  errors: string[];
  info: string[];
  warnings: string[];
}

type ValidateAddressResult = SnakeToCamelCaseObject<ValidateAddressResultDto>;

export type ValidateAddressParams = SnakeToCamelCaseObject<
  ValidateAddressParamsDto
>;
