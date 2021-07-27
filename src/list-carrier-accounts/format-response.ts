import { ListCarrierAccountsTypes } from ".";
import { Response } from "./types/private";

export function formatResponse(
  response: Response.ListCarriersResponseBody
): ListCarrierAccountsTypes.Result {
  if (response.carriers && Array.isArray(response.carriers)) {
    return response.carriers.map((carrier) => formatCarrier(carrier));
  } else {
    return [];
  }
}

function formatCarrier(
  carrier: Response.Carrier
): ListCarrierAccountsTypes.Result[0] {
  return {
    carrierId: carrier.carrier_id!, // Error in generated types
    carrierCode: carrier.carrier_code!, // Error in generated types
    accountNumber: carrier.account_number!, // Error in generated types
    requiresFundedAmount: carrier.requires_funded_amount || null,
    balance: carrier.balance || null,
    nickname: carrier.nickname || null,
    friendlyName: carrier.friendly_name || null,
    primary: carrier.primary || null,
    hasMultiPackageSupportingServices:
      carrier.has_multi_package_supporting_services || null,
    supportsLabelMessages: carrier.supports_label_messages || null,
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
): NonNullable<ListCarrierAccountsTypes.Result[0]["services"]>[0] {
  return {
    carrierId: service.carrier_id!, // Error in generated types
    carrierCode: service.carrier_code!, // Error in generated types
    serviceCode: service.service_code!, // Error in generated types
    name: service.name || null,
    domestic: service.domestic || null,
    international: service.international || null,
    isMultiPackageSupported: service.is_multi_package_supported || null,
  };
}

function formatPackageType(
  p: Response.PackageType
): NonNullable<ListCarrierAccountsTypes.Result[0]["packages"]>[0] {
  return {
    packageId: p.package_id || null, // Error in generated types
    packageCode: p.package_code,
    name: p.name,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    description: p.description!, // Error in generated types
    dimensions: p.dimensions
      ? {
          unit: p.dimensions.unit as unknown as NonNullable<
            NonNullable<
              ListCarrierAccountsTypes.Result[0]["packages"]
            >[0]["dimensions"]
          >,
          length: p.dimensions.length,
          width: p.dimensions.width,
          height: p.dimensions.height,
        }
      : null,
  };
}

function formatOption(
  option: Response.CarrierAdvancedOption
): NonNullable<ListCarrierAccountsTypes.Result[0]["options"]>[0] {
  return {
    name: option.name || null, // Error in generated types
    defaultValue: option.default_value || null, // Error in generated types
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    description: option.description || null, // Error in generated types
  };
}
