# js-async



## Using

```javascript
const coll = [[1, 1, 1], [2, 2, 2], [3, 3, 3]];
async.concat(coll, (item, callback) => {
  callback(null, item);
}, (err, result) => {
  console.log(result);
  // [1, 1, 1, 2, 2, 2, 3, 3, 3]
});
```
