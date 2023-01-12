const { resolved, rejected } = require('./promise.js');
const { isValidatePath } = require('./validatePath.js');

const mdLinks = (path) => new Promise((resolve, reject) => {

  if (isValidatePath(path)) {
    resolve(resolved(path));
  } else {
    reject(rejected('Invalid path'));
  }
})

module.exports = {
  mdLinks,
};