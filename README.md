# js-async

[![github action status](https://github.com/hexlet-components/js-async/workflows/Node%20CI/badge.svg)](https://github.com/hexlet-components/js-async/actions)

## Install

```bash
npm install @hexlet/async
```

## Usage example

```javascript
import async from '@hexlet/async';

const coll = [[1, 1, 1], [2, 2, 2], [3, 3, 3]];
async.concat(coll, (item, callback) => {
  callback(null, item);
}, (err, result) => {
  console.log(result);
  // => [1, 1, 1, 2, 2, 2, 3, 3, 3]
});
```

For more information, see the [Full Documentation](https://github.com/hexlet-components/js-async/tree/master/docs)

---

[![Hexlet Ltd. logo](https://raw.githubusercontent.com/Hexlet/assets/master/images/hexlet_logo128.png)](https://hexlet.io?utm_source=github&utm_medium=link&utm_campaign=js-async)

This repository is created and maintained by the team and the community of Hexlet, an educational project. [Read more about Hexlet](https://hexlet.io?utm_source=github&utm_medium=link&utm_campaign=js-async).

See most active contributors on [hexlet-friends](https://friends.hexlet.io/).
