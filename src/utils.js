// @ts-check

export const once = (fn) => {
  let called = false;

  return (...args) => {
    if (called) return;
    called = true;
    fn(...args);
  };
};

export const onlyOnce = (fn) => {
  let called = false;

  return (...args) => {
    if (called) throw new Error('Callback was already called.');
    called = true;
    fn(...args);
  };
};

export const noop = () => {};
