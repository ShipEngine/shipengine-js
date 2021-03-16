import { Either } from 'purify-ts';
export interface IResult {
  messages: {
    errors?: string[];
    info?: string[];
    warnings?: string[];
  };
}

export const getResultOrThrow = <L, R extends IResult>(v: Either<L, R>): R => {
  const result = v
    .ifRight((el) => {
      if (el.messages.errors?.length) {
        throw new Error(el.messages.errors.join(', '));
      }
    })
    .unsafeCoerce();
  return result;
};
