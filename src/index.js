const fs = require('fs');
const { resolved, rejected } = require('./promise');
const { isValid, toAbsolute, isMD } = require('./checkPath');

const mdLinks = (filePath) => new Promise((resolve, reject) => {
  if (isValid(filePath)) {
    const absolutePath = toAbsolute(filePath);
    const isDirectory = fs.statSync(absolutePath).isDirectory();
    if (!isDirectory) {
      // Identificar si el path corresponde a un archivo md
      if (isMD(absolutePath)) {
        resolve(resolved('It is a MD file'));
      } else {
        reject(rejected('Any MD file found'));
      }
    } else {
      resolve(resolved('It is a directory'));
    }
  } else {
    reject(rejected('Invalid path'));
  }
});

module.exports = {
  mdLinks,
};
