/**
 * A code that indicates a specific error.
 *
 * @see https://www.shipengine.com/docs/errors/codes/#error-code
 */
export enum ErrorCode {
  /**
   * Only certain carriers support pre-paid balances. So you can only add funds
   * to those carriers. If you attempt to add funds to a carrier that doesn't
   * support it, then you'll get this error code.
   */
  AutoFundNotSupported = "auto_fund_not_supported",

  /**
   * Once a batch has started processing, it cannot be modified. Attempting to
   * modify it will cause this error.
   */
  BatchCannotBeModified = "batch_cannot_be_modified",

  /**
   * You attempted to perform an operation on multiple shipments from different
   * carriers. Try performing separate operations for each carrier instead.
   */
  CarrierConflict = "carrier_conflict",

  /**
   * This error means that you're trying to use a carrier that hasn't been setup
   * yet. You can setup carriers from your ShipEngine dashboard, or via the API.
   */
  CarrierNotConnected = "carrier_not_connected",

  /**
   * The operation you are performing isn't supported by the specified carrier.
   */
  CarrierNotSupported = "carrier_not_supported",

  /**
   * Some forms of delivery confirmation aren't supported by some carriers.
   * This error means that the combination of carrier and delivery confirmation
   * are not supported.
   */
  ConfirmationNotSupported = "confirmation_not_supported",

  /**
   * This error means that two or more fields in your API request are mutually
   * exclusive or contain conflicting values. The error will include a fields
   * array that lists the conflicting fields.
   */
  FieldConflict = "field_conflict",

  /**
   * A required field is missing or empty. The field_name property indicates
   * which field is missing. Note that some fields are conditionally required,
   * based on the values of other fields or the type of operation being performed.
   */
  FieldValueRequired = "field_value_required",

  /**
   * You attempted to perform an operation that you don't have permissions to do.
   * Check your API key to ensure that you're using the correct one. Or contact
   * our support team to ensure that your account has the necessary permissions.
   */
  Forbidden = "forbidden",

  /**
   * A few parts of the ShipEngine API allow you to provide your own ID for resources.
   * These IDs must be unique; otherwise, you'll get this error code.
   */
  IdentifierConflict = "identifier_conflict",

  /**
   * When updating a resource (such as a shipment or warehouse), the ID in the URL
   * and in the request body must match.
   */
  IdentifiersMustMatch = "identifiers_must_match",

  /**
   * When creating a return label, you can optionally pair it to an outbound_label_id.
   * The outbound label must be from the same carrier as the return label.
   */
  IncompatiblePairedLabels = "incompatible_paired_labels",

  /**
   * The mailing address that you provided is invalid. Try using our address
   * validation API to verify addresses before using them.
   */
  InvalidAddress = "invalid_address",

  /**
   * You attempted to perform an operation that isn't allowed for your billing plan.
   * Contact our sales team for assistance.
   */
  InvalidBillingPlan = "invalid_billing_plan",

  /**
   * When creating a label or creating a return label, if you set the charge_event
   * field to a value that isn't offered by the carrier, then you will receive this
   * error. You can leave the charge_event field unset, or set it to carrier_default
   * instead.
   */
  InvalidChargeEvent = "invalid_charge_event",

  /**
   * One of the fields in your API request has an invalid value. The field_name
   * property indicates which field is invalid.
   */
  InvalidFieldValue = "invalid_field_value",

  /**
   * This error is similar to invalid_field_value, but is specifically for ID
   * fields, such as label_id, shipment_id, carrier_id, etc. The field_name
   * property indicates which field is invalid.
   */
  InvalidIdentifier = "invalid_identifier",

  /**
   * The operation you're attempting to perform is not allowed because the resource
   * is in the wrong status. For example, if a label's status is "voided", then
   * it cannot be included in a manifest.
   */
  InvalidStatus = "invalid_status",

  /**
   * A string field in your API request is either too short or too long. The
   * field_name property indicates which field is invalid, and the min_length
   * and max_length properties indicate the allowed length.
   */
  InvalidStringLength = "invalid_string_length",

  /**
   * Not all carriers allow you to add custom images to labels. You can only set
   * the label_image_id for supported carriers
   */
  LabelImagesNotSupported = "label_images_not_supported",

  /**
   * This error indicates a problem with your FedEx account. Please contact
   * FedEx to resolve the issue.
   */
  MeterFailure = "meter_failure",

  /**
   * The ShipEngine API endpoint that was requested does not exist.
   */
  NotFound = "not_found",

  /**
   * You have exceeded a rate limit. Check the the error_source field to determine
   * whether the rate limit was imposed by ShipEngine or by a third-party, such
   * as a carrier. If the rate limit is from ShipEngine, then consider using bulk
   * operations to reduce the nuber of API calls, or contact our support team
   * about increasing your rate limit.
   */
  RateLimitExceeded = "rate_limit_exceeded",

  /**
   * The API call requires a JSON request body. See the corresponding documentation
   * page for details about the request structure.
   */
  RequestBodyRequired = "request_body_required",

  /**
   * You may receive this error if you attempt to schedule a pickup for a return
   * label.
   */
  ReturnLabelNotSupported = "return_label_not_supported",

  /**
   * You may receive this error if you attempt to perform an operation that
   * requires a subscription. Please contact our sales department to discuss a
   * ShipEngine enterprise contract.
   */
  SubscriptionInactive = "subscription_inactive",

  /**
   * Some carriers require you to accept their terms and conditions before you
   * can use them via ShipEngine. If you get this error, then please login to
   * the ShipEngine dashboard to read and accept the carrier's terms.
   */
  TermsNotAccepted = "terms_not_accepted",

  /**
   * An API call timed out because ShipEngine did not respond within the allowed
   * timeframe.
   */
  Timeout = "timeout",

  /**
   * This error will occur if you attempt to track a package for a carrier that
   * doesn't offer that service.
   */
  TrackingNotSupported = "tracking_not_supported",

  /**
   * You may receive this error if your free trial period has expired and you
   * have not upgraded your account or added billing information.
   */
  TrialExpired = "trial_expired",

  /**
   * Your API key is incorrect, expired, or missing. Check our authentication
   * guide to learn more about authentication with ShipEngine.
   */
  Unauthorized = "unauthorized",

  /**
   * This error has not yet been assigned a code. See the notes above about how
   * to handle these.
   */
  Unspecified = "unspecified",

  /**
   * When verifying your account (by email, SMS, phone call, etc.) this error
   * indicates that the verification code is incorrect. Please re-start the
   * verification process to get a new code.
   */
  VerificationFailure = "verification_failure",

  /**
   * You attempted to perform an operation on multiple shipments from different
   * warehouses. Try performing separate operations for each warehouse instead.
   */
  WarehouseConflict = "warehouse_conflict",

  /**
   * ShipEngine only allows you to have one webhook of each type. If you would
   * like to replace a webhook with a new one, please delete the old one first.
   */
  WebhookEventTypeConflict = "webhook_event_type_conflict",
}
