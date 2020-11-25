export enum ExceptionType {
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info',
}

interface BaseShipEngineException {
  type: ExceptionType;
}

export class ShipEngineError implements BaseShipEngineException {
  type = ExceptionType.ERROR;
}

export class ShipEngineWarning implements BaseShipEngineException {
  type = ExceptionType.WARNING;
}

export class ShipEngineInfo implements BaseShipEngineException {
  type = ExceptionType.INFO;
}

export type ShipEngineException =
  | ShipEngineError
  | ShipEngineWarning
  | ShipEngineInfo;
