// @flow

import { ErrorBack } from './declarations';
import each from './each';

export default <T>(coll: [T], fn: (item: T, callback: ErrorBack) => void, callback: ErrorBack) => {
  let result = [];
  each(coll, (item, cb) => {
    fn(item, (err, y) => {
      result = result.concat(y || []);
      cb(err);
    });
  }, err => {
    callback(err, result);
  });
};
