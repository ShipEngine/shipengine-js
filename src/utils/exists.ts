export function exists<T>(v: T): v is NonNullable<T> {
  return v !== undefined && v !== null;
}

export function assertExists<T>(
  v: T,
  name = 'some value'
): asserts v is NonNullable<T> {
  if (!exists(v)) {
    const res = `${name} does not exist!`;
    throw Error(res);
  }
}
