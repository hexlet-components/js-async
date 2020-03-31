// @ts-check

import each from './each';

/**
 * concat
 * @example
 * const coll = [[1, 1, 1], [2, 2, 2], [3, 3, 3]];
 * async.concat(coll, (item, callback) => {
 *   callback(null, item);
 * }, (err, result) => {
 *   console.log(result);
 *   // => [1, 1, 1, 2, 2, 2, 3, 3, 3]
 * });
 */
export default (coll, fn, callback) => {
  let result = [];
  each(coll, (item, cb) => {
    fn(item, (err, y) => {
      result = result.concat(y || []);
      cb(err);
    });
  }, (err) => {
    callback(err, result);
  });
};
