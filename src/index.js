const { resolved, rejected } = require('./promise');
const {
  getLinks, getLinkStatus, getStats, getStatsValidate,
} = require('./link');

const {
  isValid, resolvePath, isDirectory, isMD,
} = require('./checkPath');

const mdLinks = (filePath, options = {}) => new Promise((resolve, reject) => {
  if (isValid(filePath)) {
    const absolutePath = resolvePath(filePath);
    if (!isDirectory(absolutePath)) {
      // Identificar si el path corresponde a un archivo md
      if (isMD(absolutePath)) {
        getLinks(absolutePath)
          .then((arrayLinks) => {
            // Verificar si validate = true
            if (options.validate && !options.stats) {
              getLinkStatus(arrayLinks)
                .then((validateLinks) => {
                  resolve(resolved(validateLinks));
                })
                .catch((error) => {
                  reject(rejected(error));
                });
            } else if (!options.validate && options.stats) {
              const stats = getStats(arrayLinks);
              const result = `\nTotal: ${stats.Total}\nUnique: ${stats.Unique}`;
              resolve(resolved(result));
            } else if (options.validate && options.stats) {
              getLinkStatus(arrayLinks)
                .then((validateLinks) => {
                  const stats = getStatsValidate(validateLinks);
                  const result = `\nTotal: ${stats.Total}\nUnique: ${stats.Unique}\nBroken: ${stats.Broken}`;
                  resolve(resolved(result));
                })
                .catch((error) => {
                  reject(rejected(error));
                });
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
