/**
 * @hidden
 */
export type Compute<T> = { [V in keyof T]: T[V] } & {};

export type GetArrayElement<T> = T extends (infer T)[] ? T : never;
