# js-async

[![github action status](https://github.com/hexlet-components/js-async/workflows/Node%20CI/badge.svg)](https://github.com/hexlet-components/js-async/actions)

## Install

```sh
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

[![Hexlet Ltd. logo](https://raw.githubusercontent.com/Hexlet/hexletguides.github.io/master/images/hexlet_logo128.png)](https://ru.hexlet.io/pages/about?utm_source=github&utm_medium=link&utm_campaign=js-async)

This repository is created and maintained by the team and the community of Hexlet, an educational project. [Read more about Hexlet (in Russian)](https://ru.hexlet.io/pages/about?utm_source=github&utm_medium=link&utm_campaign=js-async).
