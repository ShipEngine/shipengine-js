import { TrackPackageDTO } from "../json-rpc";
import {
  formatEvents,
  getExceptions,
  getCarrierName,
  getActualDeliveryDateTime,
} from "./util";
import { TrackPackageResult } from "./public-types";

export async function createTrackPackageResult(
  result: TrackPackageDTO,
  trackingMethod: string
): Promise<TrackPackageResult> {
  const { shipment, events } = result;
  const formattedEvents = formatEvents(events);
  const exceptionEvents = getExceptions(formattedEvents);

  const returnValue = {
    shipment: {
      shipmentId: shipment.shipmentID || "",
      carrierId: shipment.carrierAccountID || "",
      carrier: {
        code: shipment.carrierCode,
        name: getCarrierName(shipment.carrierCode),
      },
      carrierAccount: {
        id: "",
        carrier: {
          name: "",
          code: "",
        },
        accountNumber: "",
        name: "",
      },
      estimatedDeliveryDateTime: shipment.estimatedDelivery,
      actualDeliveryDateTime: getActualDeliveryDateTime(formattedEvents),
    },
    package: {
      packageId: result.package.packageID || "",
      trackingNumber: result.package.trackingNumber,
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
    // Add function to check for latest timestamp and/or status
    latestEvent: formattedEvents.slice(-1),
    hasErrors: !!exceptionEvents,
    errors: exceptionEvents,
  };
  return returnValue;
}
