/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/v2/shipment': {
    /** create a shipment! */
    post: operations['create-shipment'];
  };
  '/v2/tracking': {
    /** Tracking Information */
    get: operations['get-tracking'];
  };
  '/v2/addresses/validate': {
    /** address validator */
    post: operations['create-address-validation-result'];
  };
}

export interface components {
  schemas: {
    ShipFromAddress: {
      sender_name: string;
      address_lines: string[];
      city_locality: string;
      state_province: string;
      postal_code: string;
      country_code: 'US' | 'CA';
      is_residential: boolean;
      company_name: string;
      email: string;
      phone: string;
    };
    ReturnToAddress: {
      sender_name: string;
      address_lines: string[];
      city_locality: string;
      state_province: string;
      postal_code: string;
      country_code: 'US' | 'CA';
      is_residential: boolean;
      company_name: string;
      email: string;
      phone: string;
    };
    ShipToAddress: {
      recipient_name: string;
      address_lines: string[];
      city_locality: string;
      state_province: string;
      postal_code: string;
      country_code: 'US' | 'CA';
      is_residential: boolean;
      company_name: string;
      email: string;
      phone: string;
    };
    Billing: {
      /**
       * if duties_paid_by = sender, delivered_duty_paid = true
       * if duties_paid_by = recipient, delivered_duty_paid = false
       * if duties_paid_by = third_party, delivered_duty_paid = false
       *
       * Who pays the duty taxes (tariffs, etc, / interstate taxes)
       */
      duties_paid_by: 'recipient' | 'sender' | 'third_party';
      delivery_paid_by: 'recipient' | 'sender' | 'third_party';
      account: string;
      postal_code: string;
      country_code: 'US' | 'CA';
    };
    PackageDimensions: {
      unit: 'inch' | 'centimeter';
      length: number;
      width: number;
      height: number;
    };
    MonetaryValue: {
      currency: string;
      amount: number;
    };
    Weight: {
      /** float */
      value: number;
      /**
       * enum:
       *         - pound
       *         - ounce
       *         - gram
       *         - kilogram
       */
      unit: 'ounce' | 'pound' | 'gram' | 'kilogram';
    };
    PackageRequest: {
      dimensions: components['schemas']['PackageDimensions'];
      package_code: string;
      insured_value: components['schemas']['MonetaryValue'];
      weight: components['schemas']['Weight'];
      custom_package_id: string;
    };
    Quantity: {
      value: number;
      unit: 'each' | 'todo';
    };
    CustomItem: {
      quantity: components['schemas']['Quantity'];
      description: string;
      declared_value: components['schemas']['MonetaryValue'];
      harmonized_tariff_code: string;
      country_of_origin: 'US' | 'CA';
    };
    Customs: {
      non_delivery: 'return_to_sender' | 'treat_as_abandoned';
      /** description, quantity, declared value */
      contents: components['schemas']['CustomItem'][];
      contents_type: 'merchandise' | 'documents';
    };
    ContentItem: {
      product_name: string;
      sku: string;
      asin: string;
      quantity: {
        value?: number;
        unit?: string;
      };
      sales_order_id: string;
      sales_order_item_id: string;
      custom_order_id: string;
      custom_order_item_id: string;
      order_source_code: { [key: string]: any };
    };
    CreateShipmentRequest: {
      ship_from: components['schemas']['ShipFromAddress'] | string;
      return_to: components['schemas']['ReturnToAddress'] | string;
      ship_date: string;
      ship_to: components['schemas']['ShipToAddress'];
      returns: {
        is_return?: boolean;
        outbound_shipment_id?: string;
        rma_number?: string;
      };
      billing: components['schemas']['Billing'];
      validate_address: { [key: string]: any };
      packages: components['schemas']['PackageRequest'][];
      qr_code: {
        download_type?: 'url' | 'inline';
        file_type?: 'pdf' | 'png' | 'zpl';
      };
      label: {
        format?: 'qr_code' | 'label';
        file_type?: 'pdf' | 'png' | 'zpl';
        size?: '4x6' | '5x8';
        reference_fields?: string[];
        download_type?: 'url' | 'inline';
        image_id?: string;
      };
      /**
       * only required if the user has multiple fedex accounts
       * recommended: always specify the carrier IDs
       */
      carrier_id?: string;
      delivery_service_code: 'usps_priority_mail' | 'foo';
      pickup_service_code: 'usps_locker' | 'foo';
      /** user-invented */
      custom_order_id?: string;
      /** user-invented */
      custom_shipment_id?: string;
      customs: components['schemas']['Customs'];
      confirmation: string;
      insurance_provider: { [key: string]: any };
      contents: components['schemas']['ContentItem'][];
      non_machinable: boolean;
      contains_alcohol: boolean;
      dry_ice?: components['schemas']['Weight'];
      saturday_delivery: boolean;
    };
    ShipFromResponseAddress: {
      sender_name: string;
      address_lines: string[];
      city_locality: string;
      state_province: string;
      postal_code: string;
      country_code: 'US' | 'CA';
      is_residential: boolean;
      company_name: string;
      email: string;
      phone: string;
      warehouse_id: string;
    };
    ReturnToResponseAddress: {
      sender_name: string;
      address_lines: string[];
      city_locality: string;
      state_province: string;
      postal_code: string;
      country_code: 'US' | 'CA';
      is_residential: boolean;
      company_name: string;
      email: string;
      phone: string;
      warehouse_id: string;
    };
    LabelDocument: {
      document_type: 'label';
      reference_fields: string[];
      download_type: 'url' | 'inline';
      size: '4x6' | '5x8';
      file_type: 'pdf' | 'png' | 'zpl';
      pdf_url: { [key: string]: any };
      png_url: { [key: string]: any };
      ztf_url: { [key: string]: any };
    };
    InsuranceClaimFormDocument: {
      document_type: 'insurance_claim_form';
      download_type: 'url' | 'inline';
      size: '4x6' | '5x8';
      file_type: 'pdf' | 'png' | 'zpl';
      pdf_url: { [key: string]: any };
      png_url: { [key: string]: any };
      ztf_url: { [key: string]: any };
    };
    CustomsFormDocument: {
      document_type: 'customs_form';
      download_type: 'url' | 'inline';
      size: '4x6' | '5x8';
      file_type: 'pdf' | 'png' | 'zpl';
      pdf_url: { [key: string]: any };
      png_url: { [key: string]: any };
      ztf_url: { [key: string]: any };
    };
    PackageResponse: {
      documents: (
        | components['schemas']['LabelDocument']
        | components['schemas']['InsuranceClaimFormDocument']
        | components['schemas']['CustomsFormDocument']
      )[];
      package_code: string;
      insured_value: components['schemas']['MonetaryValue'];
      weight: components['schemas']['Weight'];
      custom_package_id: string;
      tracking_number: string;
    };
    Charge: {
      currency: string;
      amount: number;
      /** our mapping of a given charge code */
      charge_code: 'shipment_charge' | 'fuel_charge' | 'insurance_charge';
    };
    /** Address in the format [line1, line2, line3] etc */
    AddressLines: string[];
    /** City */
    CityLocality: string;
    /** Two-character country code */
    CountryCode: string;
    /** State or province or region, depending on country */
    StateProvince: string;
    BaseLocation: {
      city_locality?: components['schemas']['CityLocality'];
      country_code?: components['schemas']['CountryCode'];
      state_province?: components['schemas']['StateProvince'];
    };
    /** Location with Address */
    BaseLocationAddress: {
      address_lines?: components['schemas']['AddressLines'];
    } & components['schemas']['BaseLocation'];
    CompanyName: string;
    /** Is this location residential or commercial */
    IsResidential: boolean;
    AddressValidationAddress: components['schemas']['BaseLocationAddress'] & {
      company_name?: components['schemas']['CompanyName'];
      is_residential?: components['schemas']['IsResidential'];
    };
    ShipEngineMessage: {
      /** The message */
      message: string;
      /** The type of message */
      message_type: 'info' | 'error' | 'warning';
    };
    /** The detailed error codes that can be returned by the address validation API */
    AddressValidationDetailCode:
      | 'unsupported_country'
      | 'non_supported_country'
      | 'minimum_postal_code_verification_failed'
      | 'street_does_not_match_unique_street_name'
      | 'multiple_directionals'
      | 'multiple_matches'
      | 'suite_not_valid'
      | 'suite_missing'
      | 'incompatible_paired_labels'
      | 'invalid_house_number'
      | 'missing_house_number'
      | 'invalid_box_number'
      | 'invalid_charge_event'
      | 'missing_box_number'
      | 'missing_cmra_or_private_mail_box_number'
      | 'suite_has_no_secondaries'
      | 'postal_code_changed_or_added'
      | 'state_province_changed_or_added'
      | 'city_locality_changed_or_added'
      | 'urbanization_changed'
      | 'street_name_spelling_changed_or_added'
      | 'street_name_type_changed_or_added'
      | 'street_direction_changed_or_added'
      | 'suite_type_changed_or_added'
      | 'suite_unit_number_changed_or_added'
      | 'double_dependent_locality_changed_or_added'
      | 'subadministrative_area_changed_or_added'
      | 'subnational_area_changed_or_added'
      | 'po_box_changed_or_added'
      | 'premise_type_changed_or_added'
      | 'house_number_changed'
      | 'organization_changed_or_added'
      | 'partially_verified_to_state_level'
      | 'partially_verified_to_city_level'
      | 'partially_verified_to_street_level'
      | 'partially_verified_to_premise_level'
      | 'verified_to_state_level'
      | 'verified_to_city_level'
      | 'verified_to_street_level'
      | 'verified_to_premise_level'
      | 'verified_to_suite_level'
      | 'coded_to_street_lavel'
      | 'coded_to_neighborhood_level'
      | 'coded_to_community_level'
      | 'coded_to_state_level'
      | 'coded_to_rooftop_level'
      | 'coded_to_rooftop_interpolation_level'
      | 'name_max_length_exceeded'
      | 'phone_max_length_exceeded'
      | 'company_name_max_length_exceeded'
      | 'line1_min_max_length'
      | 'line2_max_length_exceeded'
      | 'line3_max_length_exceeded'
      | 'city_locality_max_length_exceeded'
      | 'state_province_max_length_exceeded'
      | 'invalid_postal_code'
      | 'country_invalid_length'
      | 'address_not_found';
    /** Codes are coupled to the detail_response. See: https://www.shipengine.com/docs/addresses/validation/messages */
    AddressValidationCategoryCode:
      | 'unsupported'
      | 'invalid'
      | 'changed'
      | 'partially_verified'
      | 'verified'
      | 'geocoded';
    AddressValidationMessage: components['schemas']['ShipEngineMessage'] & {
      detail_code: components['schemas']['AddressValidationDetailCode'];
      category_code: components['schemas']['AddressValidationCategoryCode'];
    };
    /** Address validation fields */
    AddressValidationInfo: {
      validated_address: components['schemas']['AddressValidationAddress'];
      is_valid: boolean;
      messages: components['schemas']['AddressValidationMessage'][];
    };
    CreateShipmentResponse: {
      shipment_id: string;
      tracking_number: string;
      tracking_url: string;
      actual_delivery_date?: string;
      minimum_delivery_days: string;
      maximum_delivery_days: string;
      delivery_window?: string;
      zone?: string;
      is_negotiated_rate: boolean;
      is_guaranteed?: boolean;
      is_trackable: boolean;
      created_at: string;
      modified_at: string;
      shipment_status:
        | 'pending'
        | 'processing'
        | 'label_purchased'
        | 'cancelled';
      ship_date: string;
      ship_to: components['schemas']['ShipToAddress'];
      ship_from: components['schemas']['ShipFromResponseAddress'];
      return_to: components['schemas']['ReturnToResponseAddress'];
      /** in V1, not in domain model */
      customs: components['schemas']['Customs'];
      billing: components['schemas']['Billing'];
      packages: components['schemas']['PackageResponse'][];
      charges: components['schemas']['Charge'][];
      /** tracking_events */
      events: { [key: string]: any }[];
      total_weight: components['schemas']['Weight'];
      validate_address:
        | 'no_validation'
        | 'validate_only'
        | 'validate_and_clean';
      charge_event: string;
      address_validation: components['schemas']['AddressValidationInfo'];
      /**
       * only required if the user has multiple fedex accounts
       * recommended: always specify the carrier IDs
       */
      carrier_id?: string;
      delivery_service_code: 'usps_priority_mail' | 'foo';
      pickup_service_code: 'usps_locker' | 'foo';
      /** user-invented */
      custom_order_id?: string;
      /** user-invented */
      custom_shipment_id?: string;
      confirmation: string;
      insurance_provider: { [key: string]: any };
      contents: components['schemas']['ContentItem'][];
      non_machinable: boolean;
      contains_alcohol: boolean;
      dry_ice?: components['schemas']['Weight'];
      saturday_delivery: boolean;
    };
    /** The carrier code (e.g. "ups", "usps") */
    CarrierCode: string;
    /** A carrier-specific tracking number. If locating a package, carrier_code is also required */
    TrackingNumber: string;
    /** A ShipEngine ID field. All IDs in ShipEngine start with a short prefix which indicates the type of resource being identified (e.g. "shp" for a shipment, "pkg" for a package) followed by an underscore and then a Base58 encoded string */
    ID: string;
    /** Base error for extension */
    BaseError: {
      error_source: string;
      error_type: string;
      error_code: string;
      message: string;
    };
    /** Base response for extension */
    BaseResponse: {
      request_id: components['schemas']['ID'];
      errors: components['schemas']['BaseError'][];
    };
    /** The source of the tracking event. Usually, this corresponds to the location of the package */
    TrackingLocation: {
      /** Latitude */
      latitude?: number;
      /** Longitude */
      longitude?: number;
    } & components['schemas']['BaseLocationAddress'];
    /** ISO-8601 date. Can be multiple formats */
    DateTime: string;
    ShipmentStatus:
      | 'accepted'
      | 'attempted_delivery'
      | 'delivered'
      | 'exception'
      | 'in_transit'
      | 'not_yet_in_system'
      | 'unknown';
    /** A single tracking event from a carrier */
    TrackingEvent: {
      location: components['schemas']['TrackingLocation'];
      event_date: components['schemas']['DateTime'];
      description: string;
      status_code: components['schemas']['ShipmentStatus'];
      /** Person that signed for the package */
      signer?: string;
      /** Whatever the carrier's code is. We have no control over this value */
      carrier_status_code: string;
      /** Whatever the carrier detail code is */
      carrier_detail_code?: string;
      messages?: components['schemas']['ShipEngineMessage'][];
    };
    TrackingInformation: {
      events?: components['schemas']['TrackingEvent'][];
      tracking_number: string;
      carrier_code: string;
      carrier_id: components['schemas']['ID'];
      ship_date?: components['schemas']['DateTime'];
      estimated_delivery_date?: components['schemas']['DateTime'];
      actual_delivery_date?: components['schemas']['DateTime'];
    };
  };
  responses: {
    /** Successful tracking response */
    GetTrackingInformation: {
      content: {
        'application/json': components['schemas']['BaseResponse'] &
          components['schemas']['TrackingInformation'];
      };
    };
    /** Address validation result */
    AddressValidationResult: {
      content: {
        'application/json': components['schemas']['BaseResponse'] &
          components['schemas']['AddressValidationInfo'];
      };
    };
  };
  parameters: {
    CarrierCode: components['schemas']['CarrierCode'];
    TrackingNumber: components['schemas']['TrackingNumber'];
    /** A ShipEngine ID, prefixed with "pkg" */
    PackageID: components['schemas']['ID'];
  };
}

export interface operations {
  /** create a shipment! */
  'create-shipment': {
    responses: {
      /** Create Shipment Success */
      200: {
        content: {
          'application/json': components['schemas']['CreateShipmentResponse'];
        };
      };
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['CreateShipmentRequest'];
      };
    };
  };
  /** Tracking Information */
  'get-tracking': {
    parameters: {
      query: {
        carrier_code?: components['parameters']['CarrierCode'];
        tracking_number?: components['parameters']['TrackingNumber'];
        /** A ShipEngine ID, prefixed with "pkg" */
        package_id?: components['parameters']['PackageID'];
      };
    };
    responses: {
      200: components['responses']['GetTrackingInformation'];
      /** Malformed request. Either carrier_code AND tracking_number OR package_id is required */
      400: unknown;
      /** Could not locate the tracking information */
      404: unknown;
    };
  };
  /** address validator */
  'create-address-validation-result': {
    responses: {
      200: components['responses']['AddressValidationResult'];
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['BaseLocationAddress'];
      };
    };
  };
}
