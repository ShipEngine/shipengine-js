"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatResponse = void 0;
function formatResponse(response) {
    return formatTrackPackageByLabelIdResult(response);
}
exports.formatResponse = formatResponse;
function formatTrackPackageByLabelIdResult(result) {
    return {
        trackingNumber: result.tracking_number,
        statusCode: result.status_code ||
            "UN",
        statusDescription: result.status_description ||
            "Unknown",
        carrierStatusCode: result.carrier_status_code,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        carrierDetailCode: result.carrier_detail_code || null,
        carrierStatusDescription: result.carrier_status_description || null,
        shipDate: result.ship_date || null,
        estimatedDeliveryDate: result.estimated_delivery_date,
        actualDeliveryDate: result.actual_delivery_date || null,
        exceptionDescription: result.exception_description || null,
        events: result.events.map(formatTrackingEvent),
    };
}
function formatTrackingEvent(event) {
    return {
        occurredAt: event.occurred_at,
        carrierOccurredAt: event.carrier_occurred_at || "",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        description: event.description,
        cityLocality: event.city_locality,
        stateProvince: event.state_province,
        postalCode: event.postal_code,
        countryCode: event.country_code || null,
        companyName: event.company_name || null,
        signer: event.signer || null,
        eventCode: event.event_code || null,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        statusCode: event.status_code || null,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        carrierStatusCode: event.carrier_status_code || null,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        carrierDetailCode: event.carrier_detail_code || null,
        latitude: event.latitude || null,
        longitude: event.longitude || null,
    };
}
//# sourceMappingURL=format-response.js.map