// @flow

type Worker = (...args: any) => void;

import { onlyOnce, noop } from './utils';
import { ErrorBack } from './declarations';

export default (functions: Array<Worker>, callback: ErrorBack = noop) => {
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
