export function formatResponse(response) {
    if (response.carriers && Array.isArray(response.carriers)) {
        return response.carriers.map((carrier) => formatCarrier(carrier));
    }
    else {
        return [];
    }
}
function formatCarrier(carrier) {
    return {
        carrierId: carrier.carrier_id,
        carrierCode: carrier.carrier_code,
        accountNumber: carrier.account_number,
        requiresFundedAmount: carrier.requires_funded_amount,
        balance: carrier.balance,
        nickname: carrier.nickname,
        friendlyName: carrier.friendly_name,
        primary: carrier.primary,
        hasMultiPackageSupportingServices: carrier.has_multi_package_supporting_services,
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
function formatService(service) {
    return {
        carrierId: service.carrier_id,
        carrierCode: service.carrier_code,
        serviceCode: service.service_code,
        name: service.name || null,
        domestic: service.domestic,
        international: service.international,
        isMultiPackageSupported: service.is_multi_package_supported,
    };
}
function formatPackageType(p) {
    return {
        packageId: p.package_id || null,
        packageCode: p.package_code,
        name: p.name,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        description: p.description,
        dimensions: p.dimensions
            ? {
                unit: p.dimensions.unit,
                length: p.dimensions.length,
                width: p.dimensions.width,
                height: p.dimensions.height,
            }
            : null,
    };
}
function formatOption(option) {
    return {
        name: option.name || null,
        defaultValue: option.default_value || null,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        description: option.description || null, // Error in generated types
    };
}
//# sourceMappingURL=format-response.js.map