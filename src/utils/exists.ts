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

/**
 *
 * @param object
 * example:
 * isCompletelyNullOrEmptyObject({ foo: null }); // true
 * isCompletelyNullOrEmptyObject(); // true
 * isCompletelyNullOrEmptyObject([]); // true
 * isCompletelyNullOrEmptyObject([null, null]); // true
 * isCompletelyNullOrEmptyObject([1, 2]); // false
 * isCompletelyNullOrEmptyObject({ foo: 123 }); // false
 */
export function isCompletelyNullOrEmptyObject<T>(object: T): boolean {
  for (const property in object) {
    if (exists(object[property])) {
      return false;
    }
  }
  return true;
}

export const isObject = (v: unknown): v is object => {
  return v !== null && typeof v === 'object';
};

export const hasProperties = <T extends object, K extends string>(
  obj: T,
  ...keys: K[]
): obj is T & { [J in K]: unknown } => {
  return (
    !!obj &&
    keys.every((key) => {
      const hasKey = Object.prototype.hasOwnProperty.call(obj, key);
      return hasKey;
    })
  );
};
