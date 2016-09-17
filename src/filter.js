// @flow

import { once, onlyOnce, noop } from './utils';
import { ErrorBack } from './declarations';

export default <T>(coll: Array<T>, iteratee: (element: T, callback: ErrorBack) => void, callback: ErrorBack = noop) => {
  const oncedCallback = once(callback);
  let completed = 0;
  const length = coll.length;
  if (length === 0) {
    callback(null, []);
  }

  const mappedColl = [];
  const iteratorCallback = (item: T, index: number, err: mixed, result: boolean) => {
    if (err) {
      oncedCallback(err);
      return;
    }
    if (result) {
      mappedColl[index] = item;
    }
    completed++;
    if (completed === length) {
      oncedCallback(err, mappedColl.filter(el => typeof el === 'number'));
    }
  };

  coll.forEach((item, index) => iteratee(item, onlyOnce(iteratorCallback.bind(null, item, index))));
};
