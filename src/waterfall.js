// @flow

import { once, onlyOnce, noop } from './utils';
import { ErrorBack } from './declarations';

export default (functions: [(...args: any) => void], callback: ErrorBack = noop) => {
  if (functions.length === 0) {
    callback();
  }

  const next = (head: (...args: any) => void, rest: [(...args: any) => void], previousResult: [mixed] = []) => {
    const cb = (err, ...args) => {
      if (err) {
        callback(err, args);
        return;
      }
      if (rest.length === 0) {
        callback(err, args);
      } else {
        setTimeout(next, 0, rest[0], rest.slice(1), args);
      }
    };

    head(...previousResult, onlyOnce(cb));
  };

  next(functions[0], functions.slice(1));
};
