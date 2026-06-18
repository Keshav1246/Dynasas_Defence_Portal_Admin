/**
 * Returns the provided value if it is non-empty, otherwise returns the fallback.
 * Checks for null, undefined, empty strings, and arrays with 0 length.
 */
export const withFallback = (value, fallback) => {
  if (value === null || value === undefined) {
    return fallback;
  }
  if (typeof value === 'string' && value.trim() === '') {
    return fallback;
  }
  if (Array.isArray(value) && value.length === 0) {
    return fallback;
  }
  return value;
};

/**
 * Ensures an array always has items. If the provided array is empty, 
 * it returns the fallback array.
 */
export const withArrayFallback = (arr, fallbackArr) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    return fallbackArr;
  }
  return arr;
};

/**
 * Ensures an object always has keys. If the object is empty/null, returns fallback.
 */
export const withObjectFallback = (obj, fallbackObj) => {
  if (!obj || Object.keys(obj).length === 0) {
    return fallbackObj;
  }
  return obj;
};
