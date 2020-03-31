// @ts-check

import { once, onlyOnce, noop } from './utils';

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
