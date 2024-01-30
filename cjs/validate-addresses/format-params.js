"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatParams = void 0;
function formatParams(params) {
    return params.map((addressInput) => ({
        name: addressInput.name,
        company_name: addressInput.companyName,
        address_line1: addressInput.addressLine1,
        address_line2: addressInput.addressLine2,
        address_line3: addressInput.addressLine3,
        city_locality: addressInput.cityLocality,
        state_province: addressInput.stateProvince,
        postal_code: addressInput.postalCode,
        country_code: addressInput.countryCode,
        address_residential_indicator: addressInput.addressResidentialIndicator,
    }));
}
exports.formatParams = formatParams;
//# sourceMappingURL=format-params.js.map