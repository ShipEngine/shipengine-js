/**
 * Normalizes fields of a user-input address
 */
export function normalizeInputAddress(arg: unknown): void {
  if (arg && typeof arg === "object") {
    const address = arg as Record<string, unknown>;

    // Convert the country to uppercase
    address.country = String(address.country || "")
      .trim()
      .toUpperCase();

    // Normalize the street to an array
    address.street = Array.isArray(address?.street)
      ? address.street
      : [address?.street];
  }
}
