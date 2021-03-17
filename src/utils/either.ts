abstract class EitherApi {
  map<Error, Success, NewSuccessResponse>(
    this: Either<Error, Success>,
    onSuccess: (v: Success) => NewSuccessResponse
  ): Either<Error, NewSuccessResponse> {
    switch (this.type) {
      case 'error':
        return new ErrorResponse(this.error);
      case 'success':
        return new SuccessResponse(onSuccess(this.result));
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
