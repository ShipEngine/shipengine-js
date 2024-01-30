/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */
export declare type GetTrackingLogResponseBody = TrackingInformation;
export declare type TrackingNumber = string;
export declare type DateTime = string;
export declare type DateTime1 = string;
export declare type DateTime2 = string;
export declare type DateTime3 = string;
export declare type DateTime4 = string;
export declare type CountryCode = string;
export interface TrackingInformation {
    tracking_number?: TrackingNumber;
    status_code?: string;
    status_description?: string;
    carrier_status_code?: string;
    carrier_status_description?: string;
    ship_date?: DateTime;
    estimated_delivery_date?: DateTime1;
    actual_delivery_date?: DateTime2;
    exception_description?: string;
    events?: TrackEvent[];
}
export interface TrackEvent {
    occurred_at: DateTime3;
    carrier_occurred_at?: DateTime4;
    city_locality: string;
    state_province: string;
    postal_code: string;
    country_code?: CountryCode;
    company_name?: string;
    signer?: string;
    event_code?: string;
    latitude?: number;
    longitude?: number;
}