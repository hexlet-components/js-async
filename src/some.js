// @ts-check

import { once, onlyOnce, noop } from './utils';

export default (coll, iteratee, callback = noop) => {
  const oncedCallback = once(callback);
  let completed = 0;
  const { length } = coll;
  if (length === 0) {
    callback(null);
  }

  const iteratorCallback = (err) => {
    if (!err) {
      oncedCallback(null, true);
      return;
    }
    completed += 1;
    if (completed === length) {
      oncedCallback(err, false);
    }
  };

  coll.forEach((item) => iteratee(item, onlyOnce(iteratorCallback)));
};
