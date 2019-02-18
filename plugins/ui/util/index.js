export createSimpleFunctional from './createSimpleFunctional';
export directiveConfig from './directiveConfig';
export load from './load';
export addOnceEventListener from './addOnceEventListener';
export blurActiveElement from './blurActiveElement';
export createRange from './createRange';
export createJavaScriptTransition from './createJavaScriptTransition';
export createSimpleTransition from './createSimpleTransition';
export getObjectValueByPath from './getObjectValueByPath';
export getZIndex from './getZIndex';



/**
 * Checks if a function is callable.
 */
export const isCallable = (func) => typeof func === 'function';



/**
 * Converts an array-like object to array.
 * Simple polyfill for Array.from
 */
export const toArray = (arrayLike) => {
  if (isCallable(Array.from)) {
    return Array.from(arrayLike);
  }

  const array = [];
  const length = arrayLike.length;
  for (let i = 0; i < length; i++) {
    array.push(arrayLike[i]);
  }

  return array;
};
