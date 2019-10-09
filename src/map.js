// @flow

import { once, onlyOnce, noop } from './utils';
import { ErrorBack } from './declarations';

export default <T>(
  coll: [T],
  iteratee: (element: T, callback: ErrorBack) => void,
  callback: ErrorBack = noop,
) => {
  const oncedCallback = once(callback);
  let completed = 0;
  const { length } = coll;
  if (length === 0) {
    callback(null);
  }

  const mappedColl = [];
  const iteratorCallback = (index: number, err: mixed, result: mixed) => {
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
