export type Compute<T> = { [V in keyof T]: T[V] } & {};
