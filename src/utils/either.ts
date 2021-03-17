abstract class EitherApi {
  map<Error, Success, Success2>(
    this: Either<Error, Success>,
    onSuccess: (v: Success) => Success2
  ): Either<Error, Success2> {
    switch (this.type) {
      case 'error':
        return new ErrorResponse(this.error);
      case 'success':
        return new SuccessResponse(onSuccess(this.result));
    }
  }

  ap<Error, Success, Success2>(
    this: Either<Error, Success>,
    eitherFn: Either<Error, (value: Success) => Either<Error, Success2>>
  ): Either<Error, Success2> {
    switch (this.type) {
      case 'error':
        return new ErrorResponse(this.error);
      case 'success':
        if (eitherFn.isSuccess()) {
          return eitherFn.result(this.result);
        } else {
          return this.ap(eitherFn);
        }
    }
  }

  isError<Error, Success>(
    this: Either<Error, Success>
  ): this is ErrorResponse<Error> {
    return this.type === 'error';
  }

  isSuccess<Error, Success>(
    this: Either<Error, Success>
  ): this is SuccessResponse<Success> {
    return !this.isError();
  }

  onSuccess<Error, Success>(
    this: Either<Error, Success>,
    fn: (v: Success) => void
  ): Either<Error, Success> {
    if (this.isSuccess()) {
      fn(this.result);
    }
    return this;
  }

  onError<Error, Success>(
    this: Either<Error, Success>,
    fn: (v: Error) => void
  ): Either<Error, Success> {
    if (this.isError()) {
      fn(this.error);
    }
    return this;
  }

  unsafeCoerce<Error, Success>(this: Either<Error, Success>): Success {
    if (this.isError()) {
      throw this.error;
    } else {
      return this.result;
    }
  }
}

/**
 * Class representing "right" (success case)
 */
export class SuccessResponse<T> extends EitherApi {
  public readonly type = 'success';

  constructor(public result: T) {
    super();
  }
}

/**
 * Class representing "left" (failure case)
 */
export class ErrorResponse<T> extends EitherApi {
  public readonly type = 'error';

  constructor(public error: T) {
    super();
  }
}

export type Either<Error, Result> =
  | ErrorResponse<Error>
  | SuccessResponse<Result>;

export const id = <T>(v: T): T => v;
