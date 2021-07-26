import { ListCarrierAccountsTypes } from ".";
import { Response } from "./types/private";

export function formatResponse(
  response: Response.ListCarriersResponseBody
): ListCarrierAccountsTypes.Response {
  if (response.carriers && Array.isArray(response.carriers)) {
    return response.carriers.map((carrier) => formatCarrier(carrier));
  } else {
    return [];
  }
}

function formatCarrier(
  carrier: Response.Carrier
): ListCarrierAccountsTypes.Carrier {
  return {
    carrierId: carrier.carrier_id!,
    carrierCode: carrier.carrier_code!,
    accountNumber: carrier.account_number!,
    requiresFundedAmount: carrier.requires_funded_amount,
    balance: carrier.balance,
    nickname: carrier.nickname,
    friendlyName: carrier.friendly_name,
    primary: carrier.primary,
    hasMultiPackageSupportingServices:
      carrier.has_multi_package_supporting_services,
    supportsLabelMessages: carrier.supports_label_messages,
    services: carrier.services
      ? carrier.services.map((service) => formatService(service))
      : [],
    packages: carrier.packages
      ? carrier.packages.map((p) => formatPackageType(p))
      : [],
    options: carrier.options
      ? carrier.options.map((option) => formatOption(option))
      : [],
  };
}

function formatService(
  service: Response.Service
): ListCarrierAccountsTypes.Service {
  return {
    carrierId: service.carrier_id!,
    carrierCode: service.carrier_code!,
    serviceCode: service.service_code!,
    name: service.name,
    domestic: service.domestic,
    international: service.international,
    isMultiPackageSupported: service.is_multi_package_supported,
  };
}

function formatPackageType(
  p: Response.PackageType
): ListCarrierAccountsTypes.PackageType {
  return {
    packageId: p.package_id,
    packageCode: p.package_code,
    name: p.name,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    description: p.description!,
    dimensions:
      p.dimensions && p.dimensions.unit
        ? {
            unit: p.dimensions.unit as ListCarrierAccountsTypes.DimensionUnit,
            length: p.dimensions.length,
            width: p.dimensions.width,
            height: p.dimensions.height,
          }
        : undefined,
  };
}

function formatOption(
  option: Response.CarrierAdvancedOption
): ListCarrierAccountsTypes.AdvancedOption {
  return {
    name: option.name,
    defaultValue: option.default_value,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    description: option.description!,
  };
}
