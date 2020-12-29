// this is currently the same as AddressValidationType, but this may change in the future.
export enum MessageType {
  INFO = 'info',
  ERROR = 'error',
  WARNING = 'warning',
}

abstract class Message {
  constructor(readonly message: string, readonly type: MessageType) {}
}

export class ShipEngineError extends Message {
  constructor(message: string) {
    super(message, MessageType.ERROR);
  }
}

export class ShipEngineWarning extends Message {
  constructor(message: string) {
    super(message, MessageType.WARNING);
  }
}

export class ShipEngineInfo extends Message {
  constructor(message: string) {
    super(message, MessageType.INFO);
  }
}

export type ShipEngineMessage =
  | ShipEngineError
  | ShipEngineInfo
  | ShipEngineWarning;

export const getMessagesByType = (
  messages: ShipEngineMessage[],
  type: MessageType
) => {
  return messages.filter((el) => el.type === type);
};

export interface MessageFields {
  info: ShipEngineInfo[];
  warnings: ShipEngineWarning[];
  errors: ShipEngineError[];
}

export const getMessageMixin = (
  messages: ShipEngineMessage[]
): MessageFields => ({
  info: getMessagesByType(messages, MessageType.INFO),
  warnings: getMessagesByType(messages, MessageType.WARNING),
  errors: getMessagesByType(messages, MessageType.ERROR),
});
