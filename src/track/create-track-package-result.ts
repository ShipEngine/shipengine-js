import { TrackPackageDTO } from "../json-rpc";
import {
  formatEvents,
  getExceptions,
  getCarrierName,
  getActualDeliveryDateTime,
} from "./util";
import { TrackPackageResult } from "./public-types";
import { getCarrierAccounts } from "./../carrier/get-carrier-accounts";
import { NormalizedConfig } from "../config";
import { EventEmitter } from "../isomorphic.node";
import { CarrierAccount } from "../carrier/public-types";

export async function createTrackPackageResult(
  result: TrackPackageDTO,
  config: NormalizedConfig,
  eventEmitter: EventEmitter
): Promise<TrackPackageResult> {
  const { shipment, events } = result;
  const formattedEvents = formatEvents(events);
  const exceptionEvents = getExceptions(formattedEvents);
  let account: CarrierAccount | undefined;

  if (shipment.carrierAccountID) {
    account = await getCarrier(
      result.shipment.carrierAccountID,
      config,
      eventEmitter
    );
  }

  const returnValue = {
    shipment: {
      shipmentId: shipment.shipmentID || "",
      carrierId: shipment.carrierAccountID || "",
      carrier: {
        code: shipment.carrierCode,
        name: getCarrierName(shipment.carrierCode),
      },
      carrierAccount: {
        id: account?.id || "",
        carrier: {
          name: account?.carrier.name || "",
          code: account?.carrier.code || "",
        },
        accountNumber: account?.accountNumber || "",
        name: account?.name || "",
      },
      // TODO Format dates properly
      estimatedDeliveryDateTime: shipment.estimatedDelivery,
      actualDeliveryDateTime: getActualDeliveryDateTime(formattedEvents),
    },
    package: {
      packageId: result.package.packageID || "",
      trackingNumber: result.package.trackingNumber,
      // TODO Make URL object
      trackingURL: result.package.trackingURL || "",
      weight: {
        unit: result.package.weight?.unit || "",
        value: result.package.weight?.value || 0,
      },
      dimensions: {
        unit: result.package.dimensions?.unit || "",
        height: result.package.dimensions?.height || 0,
        length: result.package.dimensions?.length || 0,
        width: result.package.dimensions?.width || 0,
      },
    },
    events: formattedEvents,
    latestEvent: formattedEvents.slice(-1)[0],
    hasErrors: !!exceptionEvents,
    errors: exceptionEvents,
  };
  return returnValue;
}

async function getCarrier(
  id: string,
  config: NormalizedConfig,
  eventEmitter: EventEmitter
): Promise<CarrierAccount | undefined> {
  const carrierAccounts = await getCarrierAccounts(config, eventEmitter);

  for (const account of carrierAccounts) {
    if (account.id === id) {
      return account;
    }
  }
  return undefined;
}
