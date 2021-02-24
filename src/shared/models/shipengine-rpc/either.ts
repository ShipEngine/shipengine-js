interface Functor<A> {
  map<B>(f: (v: A) => B): unknown; // typing this is hard.
}

/**
 * Class representing "right" (success case)
 */
export class SuccessResponse<T> implements Functor<T> {
  public readonly type = 'success';

  constructor(public result: T) {}

  public map = <B>(fn: (result: T) => B) =>
    new SuccessResponse(fn(this.result));
}

/**
 * Class representing "left" (failure case)
 */
export class ErrorResponse<T> implements Functor<T> {
  public readonly type = 'error';

  constructor(public error: T) {}

  public map = <B>(fn: (result: T) => B) => new ErrorResponse(fn(this.error));
}

export type Either<Result, Error> =
  | SuccessResponse<Result>
  | ErrorResponse<Error>;

export const identity = <T>(v: T): T => v;

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
      return either.map(mapSuccess);
    case 'error':
      return either.map(mapError);
  }
};
