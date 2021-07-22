/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type ListCarriersResponseBody = ListCarriersResponseBody1 & ErrorResponseBody;
export type SeId = string;
export type SeId1 = string;
export type SeId2 = string;
export type SeId3 = string;
export type SeId4 = string;
export type PackageCode = string;
export type DimensionUnit = "inch" | "centimeter";
export type Uuid = string;
export type ErrorSource = "carrier" | "order_source" | "shipengine";
export type ErrorType = "account_status" | "business_rules" | "validation" | "security" | "system" | "integrations";
export type ErrorCode =
  | "auto_fund_not_supported"
  | "batch_cannot_be_modified"
  | "carrier_conflict"
  | "carrier_disconnected"
  | "carrier_not_connected"
  | "carrier_not_supported"
  | "confirmation_not_supported"
  | "default_warehouse_cannot_be_deleted"
  | "field_conflict"
  | "field_value_required"
  | "forbidden"
  | "identifier_conflict"
  | "identifiers_must_match"
  | "insufficient_funds"
  | "invalid_address"
  | "invalid_billing_plan"
  | "invalid_field_value"
  | "invalid_identifier"
  | "invalid_status"
  | "invalid_string_length"
  | "label_images_not_supported"
  | "meter_failure"
  | "order_source_not_active"
  | "rate_limit_exceeded"
  | "refresh_not_supported"
  | "request_body_required"
  | "return_label_not_supported"
  | "settings_not_supported"
  | "subscription_inactive"
  | "terms_not_accepted"
  | "tracking_not_supported"
  | "trial_expired"
  | "unauthorized"
  | "unknown"
  | "unspecified"
  | "verification_failure"
  | "warehouse_conflict"
  | "webhook_event_type_conflict";

export interface ListCarriersResponseBody1 {
  carriers: Carrier[];
}
export interface Carrier {
  carrier_id?: SeId;
  carrier_code?: SeId1;
  account_number?: string;
  requires_funded_amount?: boolean;
  balance?: number;
  nickname?: string;
  friendly_name?: string;
  primary?: boolean;
  has_multi_package_supporting_services?: boolean;
  supports_label_messages?: boolean;
  services?: Service[];
  packages?: PackageType[];
  options?: CarrierAdvancedOption[];
}
export interface Service {
  carrier_id?: SeId2;
  carrier_code?: SeId3;
  service_code?: string;
  name?: string;
  domestic?: boolean;
  international?: boolean;
  is_multi_package_supported?: boolean;
}
export interface PackageType {
  package_id?: SeId4;
  package_code: PackageCode;
  name: string;
  dimensions?: Dimensions;
}
export interface Dimensions {
  unit: DimensionUnit & string;
  length: number;
  width: number;
  height: number;
}
export interface CarrierAdvancedOption {
  name?: string;
  default_value?: string;
}
export interface ErrorResponseBody {
  request_id: Uuid;
  errors: Error[];
}
export interface Error {
  error_source: ErrorSource;
  error_type: ErrorType;
  error_code: ErrorCode;
  message: string;
}