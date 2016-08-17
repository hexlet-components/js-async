// @flow

import { onlyOnce, noop } from './utils';
import { ErrorBack } from './declarations';

export default (times: number, fn: (callback: ErrorBack) => void, callback: ErrorBack = noop) => {
  let calledTimes = 0;

  if (times < 1) {
    callback();
  }

  const retryAttempt = () => {
    const cb = (err, result) => {
      calledTimes++;
      if (!err || calledTimes === times) {
        callback(err, result);
        return;
      }
      setTimeout(retryAttempt, 0);
    };

    fn(onlyOnce(cb));
  };

  retryAttempt();
};
