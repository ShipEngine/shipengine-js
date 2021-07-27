import { ErrorType, ErrorCode } from "../constants";
import { ShipEngineError } from "../errors";

// export interface ShipEngineErrorOne {
//   request_id: string;
//   error: {
//     message: string;
//   };
// }

// export interface ShipEngineErrorTwo {
//   request_id: string;
//   error: string;
// }

type NetworkError = {
  request_id: string;
  errors: [
    {
      error_source: string;
      error_type: string;
      error_code: string;
      message: string;
    }
  ];
};

export function isNetworkError(error: any): error is NetworkError {
  return typeof error.request_id === "string" && Array.isArray(error.errors);
}

export function handle400Errors(body: NetworkError): unknown {
  if (isNetworkError(body)) {
    throw new ShipEngineError(
      body.request_id,
      "shipengine",
      body.errors[0].error_type as ErrorType,
      body.errors[0].error_code as ErrorCode,
      body.errors[0].message
    );
  } else {
    throw new ShipEngineError(
      "system",
      "unspecified",
      "An unknown error occurred while calling the ShipEngine API"
    );
  }
}
