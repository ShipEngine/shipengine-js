import camelcaseKeys from 'camelcase-keys';

type SnakeToCamelCase<S extends string> =
  S extends `${infer T}_${infer U}` ?
  `${Lowercase<T>}${Capitalize<SnakeToCamelCase<U>>}` :
  S


type SnakeToCamelCaseObject<T> = T extends any[] ? T : T extends Function ? T : T extends object ? {
  [K in keyof T as SnakeToCamelCase<K & string>]: SnakeToCamelCaseObject<T[K]>
} : T

const camelize = <T extends object>(v: T): SnakeToCamelCaseObject<T> => camelcaseKeys(v, { deep: true }) as any

export interface ValidateAddressParamsJSON {
  street: string[];
  country_code: null | string;
  city_locality?: null | string;
  latitude?: number | null;
  longitude?: number | null;
  postal_code?: null | string;
  state_province?: null | string;
}

export interface ValidateAddressResultJSON {
  address: AddressJSON | null;
  messages: MessagesJSON;
}

export interface AddressJSON {
  street: string[];
  country_code: null | string;
  city_locality: null | string;
  latitude: number | null;
  longitude: number | null;
  postal_code: null | string;
  residential: null | boolean;
  state_province: null | string;
}

export interface MessagesJSON {
  errors: string[];
  info: string[];
  warnings: string[];
}



type ValidateAddressResult =
  SnakeToCamelCaseObject<ValidateAddressResultJSON>


export type ValidateAddressParams = SnakeToCamelCaseObject<ValidateAddressParamsJSON>

export const toValidateAddressParamsJSON = (v: ValidateAddressParams): ValidateAddressParamsJSON => {
  return {
    country_code: v.countryCode,
    street: v.street,
    city_locality: v.cityLocality,
    latitude: v.latitude,
    longitude: v.longitude,
    state_province: v.stateProvince,
    postal_code: v.postalCode,
  }
}

export const toValidateAddressResult = (v: ValidateAddressResultJSON): ValidateAddressResult => {
  return camelize(v);
}