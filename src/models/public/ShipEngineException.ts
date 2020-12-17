// this is currently the same as AddressValidationType, but this may change in the future.
export enum ShipEngineExceptionType {
  INFO = 'info',
  ERROR = 'error',
  WARNING = 'warning',
}

interface BaseShipEngineException {
  type: ShipEngineExceptionType;
  message: string;
}

export class ShipEngineError implements BaseShipEngineException {
  type = ShipEngineExceptionType.ERROR;
  message = '';
  constructor(msg: BaseShipEngineException['message']) {
    this.message = msg;
  }
}

export class ShipEngineWarning implements BaseShipEngineException {
  type = ShipEngineExceptionType.WARNING;
  message = '';
  constructor(msg: BaseShipEngineException['message']) {
    this.message = msg;
  }
}

export class ShipEngineInfo implements BaseShipEngineException {
  type = ShipEngineExceptionType.INFO;
  message = '';
  constructor(msg: BaseShipEngineException['message']) {
    this.message = msg;
  }
}

export type ShipEngineException =
  | ShipEngineError
  | ShipEngineInfo
  | ShipEngineWarning;

export const getExceptionsByType = (
  exceptions: ShipEngineException[],
  type: ShipEngineExceptionType
) => {
  return exceptions.filter((el) => el.type === type);
};
