// @ts-check

import { onlyOnce, noop } from './utils';

/**
 * waterfall
 * @example
 * const functions = [
 *   (callback) => callback('error', 'one', 'two'),
 *   (arg1, arg2, callback) => callback(null, arg2, arg1),
 * ];
 * async.waterfall(functions, (err, result) => {
 *   console.log(err); // => 'error'
 *   console.log(result); // => ['one', 'two']
 * });
 */
export default (functions, callback = noop) => {
  if (functions.length === 0) {
    callback();
    return;
  }

  const next = ([head, ...rest], previousResult) => {
    const cb = (err, ...args) => {
      if (err) {
        callback(err, args);
        return;
      }
      if (rest.length === 0) {
        callback(err, args);
      } else {
        setTimeout(next, 0, rest, args);
      }
    };

    head(...previousResult, onlyOnce(cb));
  };

  next(functions, []);
};
