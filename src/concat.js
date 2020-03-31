// @ts-check

import each from './each';

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
