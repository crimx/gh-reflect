import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isFn = (value: any): value is (...args: any[]) => any =>
  !!(value && value.constructor && value.call && value.apply);

export const useLocalStorage = <S>(key: string, initialState?: (() => S) | S): [S, Dispatch<SetStateAction<S>>] => {
  const result = useState(() => {
    const item = localStorage.getItem(key);
    if (item) {
      try {
        return JSON.parse(item);
      } catch (e) {
        console.error(e);
      }
    }
    return isFn(initialState) ? initialState() : initialState;
  });
  useEffect(() => {
    setLocalStorageItem(key, result[0]);
  }, [key, result[0]]);
  return result;
};

export const setLocalStorageItem = (key: string, value: unknown): void => {
  if (value === undefined) {
    localStorage.removeItem(key);
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
