/**
 *
 * @param v
 * @hidden
 */
export function exists<T>(v: T): v is NonNullable<T> {
  return v !== undefined && v !== null;
}

/**
 *
 * @param v
 * @param name
 * @hidden
 */
export function assertExists<T>(
  v: T,
  name = 'some value'
): asserts v is NonNullable<T> {
  if (!exists(v)) {
    const res = `${name} does not exist!`;
    throw Error(res);
  }
}
