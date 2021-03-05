import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys'

 type SnakeToCamelCase<S extends string> =
  // eslint-disable-next-line prettier/prettier
  S extends `${infer T}_${infer U}` ?
  `${Lowercase<T>}${Capitalize<SnakeToCamelCase<U>>}` :
  S


export type SnakeToCamelCaseObject<T> = T extends any[] ? T : T extends Function ? T : T extends object ? {
  [K in keyof T as SnakeToCamelCase<K & string>]: SnakeToCamelCaseObject<T[K]>
} : T


export const camelize = <T extends object>(v: T): SnakeToCamelCaseObject<T> => camelcaseKeys(v, { deep: true }) as any
export const snakeize = <T extends object>(v: T) => snakecaseKeys(v, {deep: true})  as any
