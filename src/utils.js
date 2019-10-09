// @flow

export const once = (fn: (...args: any) => void) => {
  let called = false;

  return (...args: any) => {
    if (called) return;
    called = true;
    fn(...args);
  };
};

export const onlyOnce = (fn: (...args: any) => void) => {
  let called = false;

  return (...args: any) => {
    if (called) throw new Error('Callback was already called.');
    called = true;
    fn(...args);
  };
};

export const noop = () => {};
