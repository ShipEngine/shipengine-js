import { NormalizedConfig } from "../config";
export declare function get<TResult>(endpoint: string, config: NormalizedConfig): Promise<TResult>;
export declare function post<TParams, TResult>(endpoint: string, body: TParams, config: NormalizedConfig): Promise<TResult>;
export declare function put<TParams, TResult>(endpoint: string, body: TParams, config: NormalizedConfig): Promise<TResult>;
export declare function destroy<TResult>(endpoint: string, config: NormalizedConfig): Promise<TResult>;
