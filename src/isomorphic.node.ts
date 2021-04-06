/* eslint-env node */

import AbortController from "abort-controller";
import nodeFetch from "node-fetch";

// Node.js does not natively support the Fetch API yet,
// so use the node-fetch library instead.
// NOTE: The cast is necessary because node-fetch does not 100% match the Fetch API
export const fetch = (nodeFetch as unknown) as typeof window["fetch"];

// Node.js does not natively support the AbortController API yet,
// so use the abort-controller library instead.
export { AbortController };
