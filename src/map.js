// @ts-check

import { once, onlyOnce, noop } from './utils';

/**
 * map
 * @example
 * const coll = [[1, 1, 1], [2, 2, 2], [3, 3, 3]];
 * async.map(coll, (item, callback) => {
 *   callback(null, item[0]);
 * }, (err, result) => {
 *   console.log(result); // => [1, 2, 3]
 * });
 */
export default (coll, iteratee, callback = noop) => {
  const oncedCallback = once(callback);
  let completed = 0;
  const { length } = coll;
  if (length === 0) {
    callback(null);
  }

  const mappedColl = [];
  const iteratorCallback = (index, err, result) => {
    if (err) {
      oncedCallback(err);
      return;
    }
    mappedColl[index] = result;
    completed += 1;
    if (completed === length) {
      oncedCallback(err, mappedColl);
    }
  };

  coll.forEach((item, index) => iteratee(item, onlyOnce(iteratorCallback.bind(null, index))));
};
