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
  });

  describe('#concat', () => {
    it('should work', (done) => {
      const coll = [[1, 1, 1], [2, 2, 2], [3, 3, 3]];
      async.concat(coll, (item, callback) => {
        callback(null, item);
      }, (err, result) => {
        assert.deepEqual(result, coll.reduce((acc, item) => acc.concat(item)));
        done();
      });
    });
  });

  describe('#retry', () => {
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
});
