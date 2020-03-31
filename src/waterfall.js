// @ts-check

import { onlyOnce, noop } from './utils';

export default (functions, callback = noop) => {
  if (functions.length === 0) {
    callback();
    return;
  }

  const next = ([head, ...rest], previousResult) => {
    const cb = (err, ...args) => {
      if (err) {
        callback(err, args);
        return;
      }
      if (rest.length === 0) {
        callback(err, args);
      } else {
        setTimeout(next, 0, rest, args);
      }
    };

    head(...previousResult, onlyOnce(cb));
  };

  next(functions, []);
};
