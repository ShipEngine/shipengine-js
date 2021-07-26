import { ListCarrierAccountsTypes } from ".";
import { Response } from "./types/private";
import { DimensionUnit } from "../enums";

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
    carrierId: carrier.carrier_id || "",
    carrierCode: carrier.carrier_code || "",
    accountNumber: carrier.account_number || "",
    requiresFundedAmount: carrier.requires_funded_amount,
    balance: carrier.balance,
    nickname: carrier.nickname || "",
    friendlyName: carrier.friendly_name || "",
    primary: carrier.primary,
    hasMultiPackageSupportingServices:
      carrier.has_multi_package_supporting_services,
    supports_label_messages: carrier.supports_label_messages,
    services: carrier.services
      ? carrier.services.map((service) => formatService(service))
      : [],
    packages: carrier.packages
      ? carrier.packages.map((p) => formatPackage(p))
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
    carrierId: service.carrier_id || "",
    carrierCode: service.carrier_code || "",
    serviceCode: service.service_code || "",
    name: service.name || "",
    domestic: service.domestic,
    international: service.international,
    isMultiPackageSupported: service.is_multi_package_supported,
  };
}

function formatPackage(
  p: Response.PackageType
): ListCarrierAccountsTypes.Package {
  return {
    packageId: p.package_id || "",
    packageCode: p.package_code || "",
    name: p.name || "",
    dimensions:
      p.dimensions && p.dimensions.unit
        ? {
            unit: p.dimensions.unit as DimensionUnit,
            length: p.dimensions.length,
            width: p.dimensions.width,
            height: p.dimensions.height,
          }
        : undefined,
  };
}

function formatOption(
  option: Response.CarrierAdvancedOption
): ListCarrierAccountsTypes.Options {
  return {
    name: option.name || "",
    defaultValue: option.default_value || "",
  };
}
