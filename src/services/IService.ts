export interface IService {
  getConvenienceAPI: Function;
  getAdvancedAPI: Function;
  readonly fieldName: string;
}
export type GetPublicAPI<T, U extends string> = T extends {
  fieldName: U;
  getAdvancedAPI: (...args: any[]) => infer AdvancedAPIFields;
  getConvenienceAPI: (...args: any[]) => infer ConvenienceAPIAPIFields;
}
  ? AdvancedAPIFields & ConvenienceAPIAPIFields
  : never;
