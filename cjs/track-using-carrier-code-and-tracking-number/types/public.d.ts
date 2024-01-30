export declare type Params = {
    trackingNumber: string;
    carrierCode: string;
};
export declare type Result = TrackByCarrierCodeAndTrackingNumberResult;
/**
 * The Tracking information and events associated with a label
 * @see https://www.shipengine.com/docs/tracking/track-by-label-id/
 */
interface TrackByCarrierCodeAndTrackingNumberResult {
    /**
     * A tracking number for a package. The format depends on the carrier.
     */
    trackingNumber: string;
    /**
     * Status Code
     */
    statusCode: "AC" | "IT" | "DE" | "EX" | "AT" | "UN";
    /**
     * Status Description
     */
    statusDescription: "Accepted" | "Attempted Delivery" | "Delivered" | "Exception" | "In Transit" | "Unknown";
    /**
     * Carrier Detail Code
     */
    carrierDetailCode: string | null;
    /**
     * Carrier Status Code
     */
    carrierStatusCode: string;
    /**
     * Carrier Status Description
     */
    carrierStatusDescription: string | null;
    /**
     * An ISO 8601 string that represents a date and time.
     * @see https://en.wikipedia.org/wiki/ISO_8601
     */
    shipDate: string | null;
    /**
     * An ISO 8601 string that represents a date and time.
     * @see https://en.wikipedia.org/wiki/ISO_8601
     */
    estimatedDeliveryDate: string;
    /**
     * An ISO 8601 string that represents a date and time.
     * @see https://en.wikipedia.org/wiki/ISO_8601
     */
    actualDeliveryDate: string | null;
    /**
     * Exception description
     */
    exceptionDescription: string | null;
    /**
     * The events that have occured during the lifetime of this tracking number.
     */
    events: TrackingEvent[];
}
/**
 * The events that have occurred during the lifetime of this tracking number.
 *
 * @see https://www.shipengine.com/docs/tracking/track-by-label-id/
 */
interface TrackingEvent {
    /**
     * Timestamp for carrier event
     */
    occurredAt: string;
    /**
     * Carrier timestamp for the event, it is assumed to be the local time of where the event occurred.
     */
    carrierOccurredAt: string | null;
    /**
     * Event description
     */
    description: string | null;
    /**
     * City Locality
     */
    cityLocality: string;
    /**
     * State Province
     */
    stateProvince: string;
    /**
     * Postal Code
     */
    postalCode: string;
    /**
     * The ISO 3166 country code
     *
     * @see https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
     */
    countryCode: string | null;
    /**
     * Company Name
     */
    companyName: string | null;
    /**
     * Signer information
     */
    signer: string | null;
    /**
     * Event Code
     */
    eventCode: string | null;
    /**
     * Event status code
     */
    statusCode: string | null;
    /**
     * Carrier Status Code
     */
    carrierStatusCode: string | null;
    /**
     * Carrier Detail Code
     */
    carrierDetailCode: string | null;
    /**
     * Latitude coordinate of tracking event
     */
    latitude: number | null;
    /**
     * Longitude coordinate of tracking event
     */
    longitude: number | null;
}
export {};
