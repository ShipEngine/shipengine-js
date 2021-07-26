import {
  Contents,
  Country,
  Currency,
  DeliveryConfirmation,
  InsuranceProvider,
  NonDelivery,
  OrderSourceCode,
  OriginType,
  TaxableEntityType,
  IdentifierType,
  PackageCode,
  PaymentType,
  BillToAccount,
  BillToParty,
} from "../../enums";
import { ValidateAddress } from "../../enums/validate-address";

export interface ShipmentId {
  shipmentId: string;
}

export interface Shipment {
  validateAddress: ValidateAddress;
  carrierId: string;
  serviceCode: string;
  externalOrderId: string;
  items: ShipmentItems[];
  taxIdentifiers: TaxIdentifier[];
  externalShipmentId: string;

  shipDate: Date;
  shipTo: ShippingAddress;
  shipFrom: ShippingAddress;
  wareHouseId: string;
  returnTo: ShippingAddress;
  confirmation: DeliveryConfirmation;

  customs: CustomInfo[];
  advancedOptions: AdvancedOptions;
  originType: OriginType;
  insuranceProvider: InsuranceProvider;
  orderSourceCode: OrderSourceCode | string;
  packages: Package[];
}

export interface ShipmentItems {
  name: string;
  salesOrderId: string;
  salesOrderItemId: string;
  quantity: number;
  sku: string;
  externalOrderId: string;
  externalOrderItemId: string;
  asin: string;
  TaxableE: OrderSourceCode;
}

export interface TaxIdentifier {
  taxableEntityType: TaxableEntityType;
  identifierType: IdentifierType;
  issuingAuthority: Country;
  value: string;
}

export interface CustomInfo {
  contents: Contents;
  nonDelivery: NonDelivery;
  customItems: CustomItem[];
}

export interface CustomItem {
  description: string;
  quantity: number;
  value: {
    currency: Currency;
    amount: number;
  };
  harmonizedTariffCode: string;
  countryOfOrigin: Country;
  unitOfMeasure: string;
  sku: string;
  skuDescription: string;
}
export interface AdvancedOptions {
  billToAccount?: BillToAccount;
  billToCountryCode?: Country;
  billToParty?: BillToParty;
  billToPostalCode?: string;
  containsAlcohol?: boolean;
  deliveryDutyPaid?: boolean;
  dryIce?: boolean;
  dryIceWeight: {
    value: number;
    unit: "pound" | "ounce" | "gram" | "kilogram";
  };
  nonMachinable?: boolean;
  saturdayDelivery?: boolean;
  useUPSGroundFreightPricing?: boolean;
  freightClass?: string;
  customField1?: string;
  customField2?: string;
  customField3?: string;
  originType?: OriginType;
  shipperRelease?: boolean;
  collectOnDelivery?: {
    paymentType: PaymentType;
    paymentAmount: {
      amount: number;
      currency: Currency;
    };
  };
}

export interface Package {
  packageCode: PackageCode;
  weight: Weight;
  dimensions: Dimensions;
  insuredValue: {
    currency: Currency;
    amount: number;
  };
  labelMessages: LabelMessages;
  externalPackageId?: string;
}

export interface Dimensions {
  unit: string;
  length: number;
  width: number;
  height: number;
}

export interface LabelMessages {
  reference1: string;
  reference2: string;
  reference3: string;
}

export interface Weight {
  unit: string;
  value: number;
}

export interface ShippingAddress {
  addressResidentialIndicator: string;
  name: string;
  phone: string;
  companyName: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  cityLocality: string;
  stateProvince: string;
  postalCode: string;
  countryCode: string;
}

export interface RateOptions {
  carrierIds: string[];
  packageTypes: string[];
  serviceCodes: string[];
  calculateTaAmount: boolean;
  preferredCurrency: Currency | string;
}
