import { MutableRefObject, RefCallback } from 'react';
import { RgbaColor } from 'react-colorful';

export const rgbaToHex = (rgba: string, forceRemoveAlpha = false) => {
  return (
    '#' +
    rgba
      .replace(/^rgba?\(|\s+|\)$/g, '') // Get's rgba / rgb string values
      .split(',') // splits them at ","
      .filter((_, index) => !forceRemoveAlpha || index !== 3)
      .map((string) => parseFloat(string)) // Converts them to numbers
      .map((number, index) => (index === 3 ? Math.round(number * 255) : number)) // Converts alpha to 255 number
      .map((number) => number.toString(16)) // Converts numbers to hex
      .map((string) => (string.length === 1 ? '0' + string : string)) // Adds 0 when length of one number is 1
      .join('')
  );
};

export const toStringRgba = (data: RgbaColor) => {
  return `rgba(${data.r}, ${data.g}, ${data.b}, ${data.a})`;
};

export const hexToRgba = (hexCode: string, opacity = 1) => {
  let hex = hexCode.replace('#', '');
  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const generateArray = (length = 5) =>
  Array(length)
    .fill(0)
    .map((_, i) => i);

export const normalizeArgs = (args: Record<string, any> = {}) => {
  const newArgs: Record<string, any> = {};

  Object.keys(args).forEach((key) => {
    const normalizedKey = key.split('.');
    const isNested = normalizedKey.length === 2;

    if (isNested) {
      if (!newArgs[normalizedKey[0]]) {
        newArgs[normalizedKey[0]] = {};
      }
      newArgs[normalizedKey[0]][normalizedKey[1]] = args[key];
    } else {
      newArgs[key] = args[key];
    }
  });

  return {
    ...newArgs,
    onTransformed: undefined,
    onWheelStart: undefined,
    onWheel: undefined,
    onWheelStop: undefined,
    onZoomStart: undefined,
    onZoom: undefined,
    onZoomStop: undefined,
    onPanningStart: undefined,
    onPanning: undefined,
    onPanningStop: undefined,
    onPinchStart: undefined,
    onPinch: undefined,
    onPinchStop: undefined,
  };
};

export const sleep = (ms = 1000) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const firstLetterUpperCase = (str = '') =>
  str.slice(0, 1).toUpperCase() + str.slice(1);

export const dynamicRoute = (
  route = '',
  params: Record<string, string> = {},
) => {
  const routeSplit = route.split('/').map((path) => {
    if (path.startsWith(':')) {
      const pathValue = path.slice(1);
      return params?.[pathValue] || path;
    }
    return path;
  });
  return routeSplit.join('/');
};

type MutableRefList<T> = Array<
  RefCallback<T> | MutableRefObject<T> | undefined | null
>;

export function mergeRefs<T>(...refs: MutableRefList<T>): RefCallback<T> {
  return (val: T) => {
    setRef(val, ...refs);
  };
}

export function setRef<T>(val: T, ...refs: MutableRefList<T>): void {
  refs.forEach((ref) => {
    if (typeof ref === 'function') {
      ref(val);
    } else if (ref != null) {
      ref.current = val;
    }
  });
}

export const sum = (...nums: number[]) =>
  nums.reduce((total, curr) => total + curr, 0);

export const enumToArray = <E extends object>(enums: E): E[] => {
  // @ts-ignore
  return Object.keys(enums).map((key) => enums[key]);
};
