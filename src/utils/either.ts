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

export const id = <T>(v: T): T => v;

export const match = <Success, Error, T, U>(
  either: Either<Success, Error>,
  mapSuccess: (result: Success) => T,
  mapError: (error: Error) => U
): T | U => {
  switch (either.type) {
    case 'success':
      return mapSuccess(either.result);
    case 'error':
      return mapError(either.error);
  }
};

export const bimap = <Success, Error, T, U>(
  either: Either<Success, Error>,
  mapSuccess: (v: Success) => T,
  mapError: (v: Error) => U
): Either<T, U> => {
  switch (either.type) {
    case 'success':
      return new SuccessResponse(mapSuccess(either.result));
    case 'error':
      return new ErrorResponse(mapError(either.error));
  }
};

export const toThrowable = <Result, Error>(v: Either<Result, Error>) => {
  switch (v.type) {
    case 'success':
      return v.result;
    case 'error':
      throw v.error;
  }
};
