/**
 * The types of address validation messages that can be returned by ShipEngine.
 *
 * @see https://www.shipengine.com/docs/addresses/validation/messages/
 */
export enum ValidationMessageType {
  /**
   * Informational messages about the address validation, such as minor corrections.
   */
  Info = "info",

  /**
   * Warning messages about the address validation, such as major changes that
   * were made to the normalized address.
   */
  Warning = "warning",

  /**
   * Error messages about the address validation, such as invalid fields that
   * prevent the address from being fully validated.
   */
  Error = "error",
}
