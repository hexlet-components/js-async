// @ts-check

import { once, onlyOnce, noop } from './utils';

/**
 * each
 * @example
 * const coll = [1, 2, 3];
 * let result = 0;
 * async.each(
 *   coll,
 *   (item, callback) => {
 *     result += item;
 *     callback();
 *   },
 *   () => {
 *     console.log(result); // => 6
 *   },
 * );
 */
export default (coll, iteratee, callback = noop) => {
  const oncedCallback = once(callback);
  let completed = 0;
  if (coll.length === 0) {
    callback(null);
    return;
  }

  const innerCallback = (err) => {
    completed += 1;
    if (err) {
      oncedCallback(err);
      return;
    }
    if (completed === coll.length) {
      oncedCallback(null);
    }
  };

  coll.forEach((item) => iteratee(item, onlyOnce(innerCallback)));
};
