// this is currently the same as AddressValidationType, but this may change in the future.
export enum ExceptionType {
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info',
}

interface BaseShipEngineException {
  type: ExceptionType;
  message: string;
}

export class ShipEngineError implements BaseShipEngineException {
  type = ExceptionType.ERROR;
  message = '';
  constructor(msg: BaseShipEngineException['message']) {
    this.message = msg;
  }
}

export class ShipEngineWarning implements BaseShipEngineException {
  type = ExceptionType.WARNING;
  message = '';
  constructor(msg: BaseShipEngineException['message']) {
    this.message = msg;
  }
}

export class ShipEngineInfo implements BaseShipEngineException {
  type = ExceptionType.WARNING;
  message = '';
  constructor(msg: BaseShipEngineException['message']) {
    this.message = msg;
  }
}

export type ShipEngineException =
  | ShipEngineError
  | ShipEngineInfo
  | ShipEngineWarning;
