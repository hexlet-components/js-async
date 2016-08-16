// @flow

import { onlyOnce, noop } from './utils';
import { ErrorBack } from './declarations';

export default (functions: [(...args: any) => void], callback: ErrorBack = noop) => {
  if (functions.length === 0) {
    callback();
  }

  const next = ([head, ...rest]: [(...args: any) => void], previousResult: [mixed]) => {
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
