export enum ExceptionTypeConstants {
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info',
}

interface BaseShipEngineException {
  type: ExceptionTypeConstants;
}

export class ShipEngineError implements BaseShipEngineException {
  type = ExceptionTypeConstants.ERROR;
}

export class ShipEngineWarning implements BaseShipEngineException {
  type = ExceptionTypeConstants.WARNING;
}

export class ShipEngineInfo implements BaseShipEngineException {
  type = ExceptionTypeConstants.INFO;
}

export type ShipEngineException =
  | ShipEngineError
  | ShipEngineWarning
  | ShipEngineInfo;
