const { resolved, rejected } = require('./promise');
const { isValidatePath } = require('./validatePath');

const mdLinks = (path) => new Promise((resolve, reject) => {
  if (isValidatePath(path)) {
    resolve(resolved(path));
  } else {
    reject(rejected('Invalid path'));
  }
});

module.exports = {
  mdLinks,
};
