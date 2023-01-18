const { resolved, rejected } = require('./promise');
const { getLinks } = require('./link');

const {
  isValid, resolvePath, isDirectory, isMD,
} = require('./checkPath');

const mdLinks = (filePath, options) => new Promise((resolve, reject) => {
  if (isValid(filePath)) {
    const absolutePath = resolvePath(filePath);
    if (!isDirectory(absolutePath)) {
      // Identificar si el path corresponde a un archivo md
      if (isMD(absolutePath)) {
        getLinks(absolutePath)
          .then((arrayLinks) => {
            // Verificar si validate = true
            if (options.validate && !options.stats) {
              console.log('Check for broken link');
            } else {
              resolve(resolved(arrayLinks));
            }
          })
          .catch((error) => {
            reject(rejected(error));
          });
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
