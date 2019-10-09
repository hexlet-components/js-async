// @flow

import hexletAsync from '../src';

describe('HexletAsync', () => {
  describe('#each', () => {
    it('should work', (done) => {
      let result = 0;
      const coll = [1, 2, 3];
      hexletAsync.each(coll, (item, callback) => {
        result += item;
        callback();
      }, () => {
        expect(result).toBe(6);
        done();
      });
    });

    it('should work 2', (done) => {
      const coll = [];
      hexletAsync.each(coll, () => {
      }, () => {
        done();
      });
    });

    it('should work 3', (done) => {
      const coll = [1, 2, 3];
      hexletAsync.each(coll, (item, callback) => {
        if (item === 2) {
          callback(item);
        }
      }, (err) => {
        expect(err).toBe(2);
        done();
      });
    });
  });

  describe('#concat', () => {
    it('should work', (done) => {
      const coll = [[1, 1, 1], [2, 2, 2], [3, 3, 3]];
      hexletAsync.concat(coll, (item, callback) => {
        callback(null, item);
      }, (_, result) => {
        expect(result).toEqual(coll.reduce((acc, item) => acc.concat(item)));
        done();
      });
    });

    it('should work 2', (done) => {
      const coll = [];
      hexletAsync.concat(coll, () => {
      }, () => {
        done();
      });
    });
  });

  describe('#retry', () => {
    it('should finish with error', (done) => {
      let calledTimes = 0;
      hexletAsync.retry(0, (callback) => {
        calledTimes += 1;
        callback(calledTimes);
      }, () => {
        // assert.deepEqual(err, 3);
        expect(calledTimes).toBe(1);
        done();
      });
    });

    it('should finish with error', (done) => {
      let calledTimes = 0;
      hexletAsync.retry(3, (callback) => {
        calledTimes += 1;
        callback(calledTimes);
      }, (err) => {
        expect(err).toBe(4);
        expect(calledTimes).toBe(4);
        done();
      });
    });

    it('should work', (done) => {
      let calledTimes = 0;
      hexletAsync.retry(3, (callback) => {
        calledTimes += 1;
        if (calledTimes === 2) {
          callback(null, calledTimes);
          return;
        }
        callback(calledTimes);
      }, (err, result) => {
        expect(result).toBe(2);
        expect(calledTimes).toBe(2);
        done();
      });
    });
  });

  describe('#some', () => {
    it('should work', () => {
      const coll = [1, 2, 3];
      hexletAsync.some(coll, (item, callback) => {
        callback();
      }, (err, result) => {
        expect(result).toBeTruthy();
      });
    });

    it('should work 2', () => {
      const coll = [1, 2, 3];
      hexletAsync.some(coll, (item, callback) => {
        if (item !== 2) {
          callback('error');
          return;
        }

        callback();
      }, (err, result) => {
        expect(result).toBeTruthy();
      });
    });

    it('should work 3', () => {
      const coll = [1, 2, 3];
      hexletAsync.some(coll, (item, callback) => {
        callback('error');
      }, (err, result) => {
        expect(!result).toBeTruthy();
      });
    });
  });

  describe('#map', () => {
    it('should work', (done) => {
      const coll = [[1, 1, 1], [2, 2, 2], [3, 3, 3]];
      hexletAsync.map(coll, (item, callback) => {
        callback(null, item[0]);
      }, (err, result) => {
        expect(result).toEqual([1, 2, 3]);
        done();
      });
    });
  });

  describe('#filter', () => {
    it('set 1', (done) => {
      const coll = [1, 2, 3, 4, 5, 6, 7, 8];
      hexletAsync.filter(coll, (item, callback) => {
        callback(null, item % 2 === 0);
      }, (err, result) => {
        expect(result).toEqual([2, 4, 6, 8]);
        done();
      });
    });

    it('set 2', (done) => {
      const coll = [];
      hexletAsync.filter(coll, (item, callback) => {
        callback(null, item % 2 === 0);
      }, (err, result) => {
        expect(result).toEqual([]);
        done();
      });
    });
  });

  describe('#waterfall', () => {
    it('should work', (done) => {
      const functions = [
        (callback) => callback(null, 'one', 'two'),
        (arg1, arg2, callback) => callback(null, arg2, arg1),
      ];
      hexletAsync.waterfall(functions, (err, result) => {
        const [one, two] = result;
        expect(one).toBe('two');
        expect(two).toBe('one');
        done();
      });
    });

    it('should work 2', (done) => {
      const functions = [
        (callback) => callback('error', 'one', 'two'),
        (arg1, arg2, callback) => callback(null, arg2, arg1),
      ];
      hexletAsync.waterfall(functions, (err, result) => {
        expect(err).toBe('error');
        expect(result).toEqual(['one', 'two']);
        done();
      });
    });

    it('should work 3', (done) => {
      hexletAsync.waterfall([], () => {
        done();
      });
    });
  });
});
