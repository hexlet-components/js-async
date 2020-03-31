// @ts-check

import { onlyOnce, noop } from './utils';

/**
 * retry
 * @example
 * let calledTimes = 0;
 * async.retry(3, (callback) => {
 *   calledTimes += 1;
 *   if (calledTimes === 2) {
 *     callback(null, calledTimes);
 *     return;
 *   }
 *   callback(calledTimes);
 * }, (err, result) => {
 *   console.log(calledTimes); // => 2
 *   console.log(result); // => 2
 * });
 */
export default (times, fn, callback = noop) => {
  let calledTimes = 0;

  const retryAttempt = () => {
    const cb = (err, result) => {
      calledTimes += 1;
      if (!err || calledTimes === times + 1) {
        callback(err, result);
        return;
      }
      setTimeout(retryAttempt, 0);
    };

    fn(onlyOnce(cb));
  };

  retryAttempt();
};
