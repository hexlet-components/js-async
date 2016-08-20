// @flow

import { describe, it } from 'mocha';

import assert from 'assert';
import async from '../src/index';

describe('HexletAsync', () => {
  describe('#each', () => {
    it('should work', (done) => {
      let result = 0;
      const coll = [1, 2, 3];
      async.each(coll, (item, callback) => {
        result += item;
        callback();
      }, () => {
        assert.equal(result, 6);
        done();
      });
    });

    it('should work 2', (done) => {
      const coll = [];
      async.each(coll, (item, callback) => {
      }, () => {
        done();
      });
    });
  });

  describe('#concat', () => {
    it('should work', done => {
      const coll = [[1, 1, 1], [2, 2, 2], [3, 3, 3]];
      async.concat(coll, (item, callback) => {
        callback(null, item);
      }, (err, result) => {
        assert.deepEqual(result, coll.reduce((acc, item) => acc.concat(item)));
        done();
      });
    });

    it('should work 2', done => {
      const coll = [];
      async.concat(coll, (item, callback) => {
      }, (err, result) => {
        done();
      });
    });
  });

  describe('#retry', () => {
    it('should finish with error', (done) => {
      let calledTimes = 0;
      async.retry(0, callback => {
        calledTimes++;
        callback(calledTimes);
      }, (err, result) => {
        // assert.deepEqual(err, 3);
        assert.equal(calledTimes, 0);
        done();
      });
    });

    it('should finish with error', (done) => {
      let calledTimes = 0;
      async.retry(3, (callback) => {
        calledTimes++;
        callback(calledTimes);
      }, (err, result) => {
        assert.deepEqual(err, 3);
        assert.equal(calledTimes, 3);
        done();
      });
    });

    it('should work', (done) => {
      let calledTimes = 0;
      async.retry(3, (callback) => {
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
      async.some(coll, (item, callback) => {
        callback();
      }, (err, result) => {
        assert.ok(result);
      });
    });

    it('should work 2', () => {
      const coll = [1, 2, 3];
      async.some(coll, (item, callback) => {
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
      async.some(coll, (item, callback) => {
        callback('error');
      }, (err, result) => {
        assert.ok(!result);
      });
    });
  });

  describe('#map', () => {
    it('should work', (done) => {
      const coll = [[1, 1, 1], [2, 2, 2], [3, 3, 3]];
      async.map(coll, (item, callback) => {
        callback(null, item[0]);
      }, (err, result) => {
        assert.deepEqual(result, [1, 2, 3]);
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
      async.waterfall(functions, (err, result) => {
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
      async.waterfall(functions, (err, result) => {
        assert.equal(err, 'error');
        assert.deepEqual(result, ['one', 'two']);
        done();
      });
    });

    it('should work 3', (done) => {
      async.waterfall([], () => {
        done();
      });
    });
  });
});
