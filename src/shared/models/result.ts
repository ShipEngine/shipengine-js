import { Either } from "../../utils/either";

export type MessagesObj = {
  errors: string[];
  info: string[];
  warnings: string[];
};

export interface IResult {
  messages: MessagesObj;
}

const hasMessages = (t: unknown): t is IResult => {
  return typeof t === "object" && t !== null && "messages" in t;
};

export const getResultOrThrow = <L, R>(v: Either<L, R>): R => {
  const result = v
    .onSuccess((el) => {
      if (hasMessages(el)) {
        if (el.messages.errors?.length) {
          throw new Error(el.messages.errors.join(", "));
        }
      }
    })
    .unsafeCoerce();
  return result;
};
