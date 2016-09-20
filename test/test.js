// @flow

import { describe, it } from 'mocha';

import assert from 'assert';
import hexletAsync from '../src/index';

describe('HexletAsync', () => {
  describe('#each', () => {
    it('should work', (done) => {
      let result = 0;
      const coll = [1, 2, 3];
      hexletAsync.each(coll, (item, callback) => {
        result += item;
        callback();
      }, () => {
        assert.equal(result, 6);
        done();
      });
    });

    it('should work 2', (done) => {
      const coll = [];
      hexletAsync.each(coll, (item) => {
      }, () => {
        done();
      });
    });

    it('should work 3', (done) => {
      const coll = [1, 2, 3];
      hexletAsync.each(coll, (item, callback) => {
        if (item === 2) {
          callback(item);
          return;
        }
      }, err => {
        assert.equal(err, 2);
        done();
      });
    });
  });

  describe('#concat', () => {
    it('should work', done => {
      const coll = [[1, 1, 1], [2, 2, 2], [3, 3, 3]];
      hexletAsync.concat(coll, (item, callback) => {
        callback(null, item);
      }, (err, result) => {
        assert.deepEqual(result, coll.reduce((acc, item) => acc.concat(item)));
        done();
      });
    });

    it('should work 2', done => {
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
      hexletAsync.retry(0, callback => {
        calledTimes++;
        callback(calledTimes);
      }, (err, result) => {
        // assert.deepEqual(err, 3);
        assert.equal(calledTimes, 1);
        done();
      });
    });

    it('should finish with error', (done) => {
      let calledTimes = 0;
      hexletAsync.retry(3, (callback) => {
        calledTimes++;
        callback(calledTimes);
      }, (err, result) => {
        assert.deepEqual(err, 4);
        assert.equal(calledTimes, 4);
        done();
      });
    });

    it('should work', (done) => {
      let calledTimes = 0;
      hexletAsync.retry(3, (callback) => {
        calledTimes++;
        if (calledTimes === 2) {
          callback(null, calledTimes);
          return;
        }
        callback(calledTimes);
      }, (err, result) => {
        assert.equal(result, 2);
        assert.equal(calledTimes, 2);
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
        assert.ok(result);
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
        assert.ok(result);
      });
    });

    it('should work 3', () => {
      const coll = [1, 2, 3];
      hexletAsync.some(coll, (item, callback) => {
        callback('error');
      }, (err, result) => {
        assert.ok(!result);
      });
    });
  });

  describe('#map', () => {
    it('should work', (done) => {
      const coll = [[1, 1, 1], [2, 2, 2], [3, 3, 3]];
      hexletAsync.map(coll, (item, callback) => {
        callback(null, item[0]);
      }, (err, result) => {
        assert.deepEqual(result, [1, 2, 3]);
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
        assert.deepEqual(result, [2, 4, 6, 8]);
        done();
      });
    });

    it('set 2', (done) => {
      const coll = [];
      hexletAsync.filter(coll, (item, callback) => {
        callback(null, item % 2 === 0);
      }, (err, result) => {
        assert.deepEqual(result, []);
        done();
      });
    });
  });

  describe('#waterfall', () => {
    it('should work', (done) => {
      const functions = [
        callback => callback(null, 'one', 'two'),
        (arg1, arg2, callback) => callback(null, arg2, arg1),
      ];
      hexletAsync.waterfall(functions, (err, result) => {
        assert.deepEqual(result[0], 'two');
        assert.deepEqual(result[1], 'one');
        done();
      });
    });

    it('should work 2', (done) => {
      const functions = [
        callback => callback('error', 'one', 'two'),
        (arg1, arg2, callback) => callback(null, arg2, arg1),
      ];
      hexletAsync.waterfall(functions, (err, result) => {
        assert.equal(err, 'error');
        assert.deepEqual(result, ['one', 'two']);
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
