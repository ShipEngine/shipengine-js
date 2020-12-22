import { Overwrite as _Overwrite } from 'utility-types';

/**
 * Return type T that's friendly to intellisense.
 */
export type Compute<T> = { [V in keyof T]: T[V] } & {};

/**
 * Return unwrapped type T when given T[].
 */
export type GetArrayElement<T> = T extends (infer T)[] ? T : never;

/**
 * Overwrite type T with Properties on type U.
 */
export type Overwrite<T extends object, U extends object> = Compute<
  _Overwrite<T, U>
>;
