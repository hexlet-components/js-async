// @ts-check

import { onlyOnce, noop } from './utils';

export default (times, fn, callback = noop) => {
  let calledTimes = 0;

  const retryAttempt = () => {
    const cb = (err, result) => {
      calledTimes += 1;
      if (!err || calledTimes === times + 1) {
        callback(err, result);
        return;
      }
      setTimeout(retryAttempt, 0);
    };

    fn(onlyOnce(cb));
  };

  retryAttempt();
};
