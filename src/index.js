const { resolved, rejected } = require('./promise');
const { getLinks } = require('./link');
const {
  isValid, toAbsolute, isDirectory, isMD,
} = require('./checkPath');

const mdLinks = (filePath) => new Promise((resolve, reject) => {
  if (isValid(filePath)) {
    const absolutePath = toAbsolute(filePath);
    if (!isDirectory(absolutePath)) {
      // Identificar si el path corresponde a un archivo md
      if (isMD(absolutePath)) {
        getLinks(absolutePath);
        resolve(resolved('It is a MD file'));
      } else {
        reject(rejected('No MD file found'));
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
