import { InsuranceProvider } from "../../create-label/types/private-request";
import { ErrorCode, ErrorSource, ErrorType } from "../../enums";

import {
  AdvancedOptions,
  Contents,
  Currency,
  CustomItem,
  DeliveryConfirmation,
  NonDelivery,
  OrderSourceCode,
  OriginType,
  Package,
  ShipmentItem,
  ShipmentStatus,
  ShippingAddress,
  TaxIdentifier,
  ValidationStatus,
} from "./public";

export interface GetRatesResult {
  shipmentId: string;
  carrierId: string;
  serviceCode: string;
  externalOrderId: string;
  items: ShipmentItem[];
  taxIdentifiers: TaxIdentifier[];
  externalShipmentId: string;
  shipDate: string;
  createdAt: string;
  modifiedAt: string;
  shipmentStatus: ShipmentStatus;
  shipTo: ShippingAddress;
  shipFrom: ShippingAddress;
  warehouseId: string;
  returnTo: ShippingAddress;
  confirmation: DeliveryConfirmation;
  customs: {
    contents: Contents;
    nonDelivery: NonDelivery;
    customsItems: CustomItem;
  };
  advancedOptions: AdvancedOptions;
  originType: OriginType;
  insuranceProvider: InsuranceProvider;
  tags: string[];
  orderSourceCode?: OrderSourceCode | string;
  packages: Package[];
  totalWeight: {
    value: number;
    unit: "pound" | "ounce" | "gram" | "kilogram";
  };
  rateResponse: {
    rates: Rate[];
    invalid_rates: Rate[];
    rate_request_id: string;
    shipment_id: string;
    created_at: string;
    status: "working" | "completed" | "partial" | "error";
    errors: Error[];
  };
}

export interface Error {
  error_source: ErrorSource;
  error_type: ErrorType;
  error_code: ErrorCode;
  message: string;
}
export interface Rate {
  rateId: string;
  rateType: "check" | "shipment";
  carrierId: string;
  shippingAmount: MonetaryValue;
  insuranceAmount: MonetaryValue;
  confirmationAmount: MonetaryValue;
  otherAmount: MonetaryValue;
  taxAmount: MonetaryValue;
  zone: number;
  packageType: string;
  deliveryDays: number;
  guaranteedService: boolean;
  estimatedDeliveryDate: string;
  carrierDeliveryDays: string;
  shipDate: string;
  negotiatedRate: boolean;
  serviceType: string;
  serviceCode: string;
  trackable: boolean;
  carrierCode: string;
  carrierNickname: string;
  carrierFriendlyName: string;
  validationStatus: ValidationStatus;
  warningMessages: string[];
  errorMessages: string[];
}

export interface MonetaryValue {
  currency: Currency;
  value: number;
}
