import type * as Dto from './validate-address.dto';

import * as E from './validate-address.entities';

export const toValidateAddressParamsDto = (
  v: E.ValidateAddressParams
): Dto.ValidateAddressParamsDto => {
  return {
    countryCode: v.countryCode || null,
    street: v.street,
    cityLocality: v.cityLocality,
    postalCode: v.postalCode,
    stateProvince: v.stateProvince,
  };
};

export const toValidateAddressConvenience = (
  v: E.ValidateAddressResult
): E.ValidateAddressConvenienceResult => {
  return {
    isValid: v.isValid,
    messages: v.messages,
    normalized: v.normalized,
    original: v.original,
  };
};

export const toAddress = (v: Dto.AddressAddressResultDto) => {
  return {
    street: v?.street ?? [],
    postalCode: v?.postalCode ?? undefined,
    cityLocality: v?.cityLocality ?? undefined,
    countryCode: v?.countryCode ?? undefined,
    stateProvince: v?.stateProvince ?? undefined,
    isResidential: v?.residential ?? undefined,
  };
};
