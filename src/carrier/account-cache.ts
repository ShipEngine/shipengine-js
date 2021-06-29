import { CarrierAccount } from "./public-types";

/**
 * Constant variable used to hold cached carrier accounts.
 */
const accountCache: CarrierAccount[] = [];

/**
 * This function is called by the getCarrierAccounts method to get the cached carrier accounts, filtering
 * by carrierId if appropriate.
 */
export function getAccountCache(carrierCode?: string): CarrierAccount[] {
  if (accountCache.length === 0) {
    return accountCache;
  }
  if (carrierCode) {
    const filteredAccounts: CarrierAccount[] = [];

    for (const account of accountCache) {
      if (account.carrier.code === carrierCode) {
        filteredAccounts.push(account);
      }
    }
    return filteredAccounts;
  }
  return accountCache;
}

/**
 * This function is called by getCarrierAccounts to update the cache anytime an RPC call is made to get carriers.
 */
export function setAccountCache(accounts: CarrierAccount[]): void {
  // Set the length to 0 to clear the cache
  clearAccountCache();
  for (const account of accounts) {
    accountCache.push(account);
  }
}

/**
 * Clear Carrier account cache
 */
export function clearAccountCache(): void {
  accountCache.length = 0;
}
