import { Either, Right } from 'purify-ts';
export interface IResult {
  messages: {
    errors?: string[];
    info?: string[];
    warnings?: string[];
  };
}

export const assertNoErrors = <L, R extends IResult>(
  v: Either<L, R>
): NonNullable<R> => {
  const result = v
    .ifRight((el) => {
      if (el.messages.errors?.length) {
        throw new Error(el.messages.errors.join(', '));
      }
    })
    .unsafeCoerce();
  if (result === null) {
    throw new Error('no result!');
  }
  return result as NonNullable<R>;
};
