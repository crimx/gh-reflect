/**
 * Like `Array.prototype.filter`, but returns the same array if no elements are removed.
 */
export const smartFilter = <T, U extends T>(
  array: readonly T[],
  callbackfn: (value: T, index: number, array: readonly T[]) => value is U,
  thisArg?: unknown,
): U[] => {
  let result: U[] | undefined;

  const len = array.length;
  for (let i = 0; i < len; i++) {
    if (callbackfn.call(thisArg, array[i], i, array)) {
      result?.push(array[i] as unknown as U);
    } else {
      result ??= array.slice(0, i) as unknown as U[];
    }
  }

  return result || (array as unknown as U[]);
};
