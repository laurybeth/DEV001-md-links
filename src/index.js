const { resolved, rejected } = require('./promise');
const { isValid, toAbsolute } = require('./checkPath');

const mdLinks = (path) => new Promise((resolve, reject) => {
  if (isValid(path)) {
    const absolutePath = toAbsolute(path);
    resolve(resolved(absolutePath));
  } else {
    reject(rejected('Invalid path'));
  }
});

module.exports = {
  mdLinks,
};
