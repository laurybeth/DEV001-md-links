const { resolved, rejected } = require('./promise.js');
const fs = require('fs');

const mdLinks = (path) => new Promise((resolve, reject) => {

  if (fs.existsSync(path)) {
    resolve(resolved(path));
  } else {
    reject(rejected('Invalid path'));
  }
})

module.exports = {
  mdLinks,
};