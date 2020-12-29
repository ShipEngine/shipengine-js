type Maybe<T> = T | undefined;

/**
 * Returns last element of a list.
 *
 * @param list - list
 */

export const last = <T>(list: T[]): Maybe<T> => list.slice(list.length - 1)[0];

/**
 * Returns the first element of a list.
 *
 * @param list - list
 */
export const head = <T>(list: T[]): Maybe<T> => list[0];

/**
 * Returns the last element of a list via predicate
 *
 * @param list
 * @param expression
 */
export const findLast = <T>(
  predicate: (value: T) => boolean,
  list: T[]
): Maybe<T> => last(list.filter(predicate));

export const flatten = <T>(arr: T[][]): T[] =>
  arr.reduce((p, n) => p.concat(n), []);
