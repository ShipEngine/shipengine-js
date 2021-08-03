// import { EventEmitter } from "../isomorphic.node";
import { NormalizedConfig } from "../config";
import { put } from "../client";
import * as VoidLabelWithLabelId from "./types/public";
import { Response } from "./types/private";
import { InvalidFieldValueError } from "../errors";

export { VoidLabelWithLabelId };

/**
 * Void a label with its ID
 *
 * https://www.shipengine.com/docs/labels/voiding/
 */
export async function voidLabelWithLabelId(
  id: string,
  config: NormalizedConfig
): Promise<VoidLabelWithLabelId.Result> {
  if (typeof id !== "string") {
    throw new InvalidFieldValueError("ID", "must be a string.", id);
  }

  const response = await put<unknown, Response.VoidLabelResponseBody>(
    `/v1/labels/${id}/void`,
    {},
    config
  );

  return response;
}
