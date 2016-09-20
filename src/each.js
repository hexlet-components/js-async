// @flow

import { once, onlyOnce, noop } from './utils';
import { ErrorBack } from './declarations';

export default <T>(coll: [T], iteratee: (element: T, callback: ErrorBack) => void, callback: ErrorBack = noop) => {
  const oncedCallback = once(callback);
  let completed = 0;
  if (coll.length === 0) {
    callback(null);
    return
  }

  const innerCallback = (err: mixed) => {
    completed++;
    if (err) {
      oncedCallback(err);
      return;
    }
    if (completed === coll.length) {
      oncedCallback(null);
    }
  };

  coll.forEach(item => iteratee(item, onlyOnce(innerCallback)));
};
