export interface IResult {
  messages: {
    errors?: string[];
    info?: string[];
    warnings?: string[];
  };
}
