// @flow

import { once, onlyOnce, noop } from './utils';
import { ErrorBack } from './declarations';

export default <T>(coll: [T], iteratee: (element: T, callback: ErrorBack) => void, callback: ErrorBack = noop) => {
  const oncedCallback = once(callback);
  let completed = 0;
  const length = coll.length;
  if (length === 0) {
    callback(null);
  }

  const iteratorCallback = (err: mixed) => {
    if (!err) {
      oncedCallback(null, true);
      return;
    }
    completed++;
    if (completed === length) {
      oncedCallback(err, false);
    }
  };

  coll.forEach(item => iteratee(item, onlyOnce(iteratorCallback)));
};
