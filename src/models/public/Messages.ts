// this is currently the same as AddressValidationType, but this may change in the future.
export enum MessageType {
  INFO = 'info',
  ERROR = 'error',
  WARNING = 'warning',
}

interface Message {
  type: MessageType;
  message: string;
}

export class ShipEngineError implements Message {
  type = MessageType.ERROR;
  message = '';
  constructor(msg: Message['message']) {
    this.message = msg;
  }
}

export class ShipEngineWarning implements Message {
  type = MessageType.WARNING;
  message = '';
  constructor(msg: Message['message']) {
    this.message = msg;
  }
}

export class ShipEngineInfo implements Message {
  type = MessageType.INFO;
  message = '';
  constructor(msg: Message['message']) {
    this.message = msg;
  }
}

export type ShipEngineMessage =
  | ShipEngineError
  | ShipEngineInfo
  | ShipEngineWarning;

export const getExceptionsByType = (
  exceptions: ShipEngineMessage[],
  type: MessageType
) => {
  return exceptions.filter((el) => el.type === type);
};

export interface MessageFields {
  info: ShipEngineInfo[];
  warnings: ShipEngineWarning[];
  errors: ShipEngineError[];
}

export const getMessages = (messages: ShipEngineMessage[]): MessageFields => ({
  info: getExceptionsByType(messages, MessageType.INFO),
  warnings: getExceptionsByType(messages, MessageType.WARNING),
  errors: getExceptionsByType(messages, MessageType.ERROR),
});
