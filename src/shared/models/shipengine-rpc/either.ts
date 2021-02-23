/**
 * Class representing "right" (success case)
 */
export class SuccessResponse<T> {
  public readonly type = 'success';
  constructor(public result: T) {}
}

/**
 * Class representing "left" (failure case)
 */
export class ErrorResponse<T> {
  public readonly type = 'error';
  constructor(public error: T) {}
}

export type Either<Result, Error> =
  | SuccessResponse<Result>
  | ErrorResponse<Error>;

const identity = <T>(v: T): T => v;

export const match = <T, Success, Error>(
  either: Either<Success, Error>,
  mapSuccess: (result: Success) => T,
  mapError: (error: Error) => T
) => {
  switch (either.type) {
    case 'success':
      return mapSuccess(either.result);
    case 'error':
      return mapError(either.error);
  }
};

export const mapEither = <Success, Error, T>(
  either: Either<Success, Error>,
  mapSuccess: (v: Success) => T,
  mapError: (v: Error) => Error = identity
): Either<T, Error> => {
  switch (either.type) {
    case 'success':
      return new SuccessResponse(mapSuccess(either.result));
    case 'error':
      return new ErrorResponse(mapError(either.error));
  }
};
