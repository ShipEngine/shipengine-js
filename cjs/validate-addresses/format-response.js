"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatResponse = void 0;
function formatResponse(response) {
    return response.map((result) => formatAddressValidationResult(result));
}
exports.formatResponse = formatResponse;
function formatAddressValidationResult(result) {
    const normalizedAddressResponse = result.matched_address;
    const originalAddressResponse = result.original_address;
    return {
        status: result.status,
        originalAddress: {
            name: originalAddressResponse.name,
            phone: originalAddressResponse.phone,
            companyName: originalAddressResponse.company_name || null,
            addressLine1: originalAddressResponse.address_line1,
            addressLine2: originalAddressResponse.address_line2 || null,
            addressLine3: originalAddressResponse.address_line3 || null,
            cityLocality: originalAddressResponse.city_locality,
            stateProvince: originalAddressResponse.state_province,
            postalCode: originalAddressResponse.postal_code,
            countryCode: originalAddressResponse.country_code,
            addressResidentialIndicator: originalAddressResponse.address_residential_indicator, // Error in generated types
        },
        normalizedAddress: normalizedAddressResponse
            ? mapNormalizedAddress(normalizedAddressResponse)
            : null,
        messages: result.messages.map((m) => ({
            detailCode: m.detail_code,
            message: m.message,
            type: m.type,
        })),
    };
}
function mapNormalizedAddress(normalizedAddressResponse) {
    return {
        name: normalizedAddressResponse.name,
        phone: normalizedAddressResponse.phone,
        companyName: normalizedAddressResponse.company_name || null,
        addressLine1: normalizedAddressResponse.address_line1,
        addressLine2: normalizedAddressResponse.address_line2 || null,
        addressLine3: normalizedAddressResponse.address_line3 || null,
        cityLocality: normalizedAddressResponse.city_locality,
        stateProvince: normalizedAddressResponse.state_province,
        postalCode: normalizedAddressResponse.postal_code,
        countryCode: normalizedAddressResponse.country_code,
        addressResidentialIndicator: normalizedAddressResponse.address_residential_indicator, // Error in generated types
    };
}
//# sourceMappingURL=format-response.js.map