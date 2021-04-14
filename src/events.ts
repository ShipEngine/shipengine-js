/* eslint-disable @typescript-eslint/ban-types */

/**
 * The events that are emitted by the ShipEngine SDK
 */
export enum Event {
  /**
   * This event is emitted before each HTTP request is sent to the ShipEngine API
   */
  RequestSent = "requestSent",

  /**
   * This event is emitted after each HTTP response is received from the ShipEngine API
   */
  ResponseReceived = "responseReceived",
}

/**
 * A listener for the "requestSent" event
 */
export type RequestSentListener = (event: RequestSentEvent) => void;

/**
 * A listener for the "responseReceived" event
 */
export type ResponseReceivedListener = (event: ResponseReceivedEvent) => void;

/**
 * All ShipEngine events include this information
 */
export interface ShipEngineEvent {
  /**
   * The date/time that the event occurred
   */
  timestamp: Date;

  /**
   * The tyoe of event that occurred
   */
  type: Event;

  /**
   * A description of the event that occurred
   */
  message: string;
}

/**
 * The information received when a "requestSent" event occurs
 */
export interface RequestSentEvent extends ShipEngineEvent {
  type: Event.RequestSent;

  /**
   * The unique ID of the HTTP request
   */
  readonly requestID: string;

  /**
   * The full URL being requested
   */
  readonly url: URL;

  /**
   * The HTTP request headers
   */
  readonly headers: Readonly<Record<string, string>>;

  /**
   * The body of the HTTP request
   */
  readonly body: Readonly<object>;

  /**
   * If the request is a retry, this is the retry counter
   */
  readonly retry: number;

  /**
   * The maximum amount of time (in milliseconds) that will be allowed before
   * the request times out.
   */
  readonly timeout: number;
}

/**
 * The information received when a "responseReceived" event occurs
 */
export interface ResponseReceivedEvent extends ShipEngineEvent {
  type: Event.ResponseReceived;

  /**
   * The unique ID of the HTTP request that this response is in reply to
   */
  readonly requestID: string;

  /**
   * The full URL that was requested
   */
  readonly url: URL;

  /**
   * The HTTP response status code
   */
  readonly statusCode: number;

  /**
   * The HTTP response headers
   */
  readonly headers: Readonly<Record<string, string>>;

  /**
   * The body of the HTTP response
   */
  readonly body: Readonly<object>;

  /**
   * If the request was a retry, this is the retry counter
   */
  readonly retry: number;

  /**
   * The amount of time (in milliseconds) that elapsed between the request
   * and the response
   */
  readonly elapsed: number;
}
