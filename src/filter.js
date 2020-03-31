// @ts-check

import { once, onlyOnce, noop } from './utils';
/**
 * filter
 * @example
 * const coll = [1, 2, 3, 4, 5, 6, 7, 8];
 * async.filter(coll, (item, callback) => {
 *   callback(null, item % 2 === 0);
 * }, (err, result) => {
 *   console.log(result); // => [2, 4, 6, 8]
 * });
 */
export default (coll, iteratee, callback = noop) => {
  const oncedCallback = once(callback);
  let completed = 0;
  const { length } = coll;
  if (length === 0) {
    callback(null, []);
  }

  const mappedColl = [];
  const iteratorCallback = (item, index, err, result) => {
    if (err) {
      oncedCallback(err);
      return;
    }
    if (result) {
      mappedColl[index] = item;
    }
    completed += 1;
    if (completed === length) {
      oncedCallback(err, mappedColl.filter((el) => typeof el === 'number'));
    }
  };

  coll.forEach((item, index) => iteratee(item, onlyOnce(iteratorCallback.bind(null, item, index))));
};
