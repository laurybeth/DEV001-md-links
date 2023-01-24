const { getLinksFromDirectory } = require('./directory');
const { resolved, rejected } = require('./promise');
const {
  getLinks, getLinkStatus, getStats, getStatsWithValidate,
} = require('./link');

const {
  isValid, resolvePath, isDirectory, isMD,
} = require('./path');

const mdLinks = (filePath, options = {}) => new Promise((resolve, reject) => {
  if (isValid(filePath)) {
    const absolutePath = resolvePath(filePath);
    if (!isDirectory(absolutePath)) {
      // Identificar si el path corresponde a un archivo md
      if (isMD(absolutePath)) {
        getLinks(absolutePath)
          .then((links) => {
            // Verificar si validate = true
            if (options.validate && !options.stats) {
              getLinkStatus(links)
                .then((validateLinks) => {
                  resolve(resolved(validateLinks));
                })
                .catch((error) => {
                  reject(rejected(error));
                });
            } else if (!options.validate && options.stats) {
              const stats = getStats(links);
              const result = `\nTotal: ${stats.Total}\nUnique: ${stats.Unique}`;
              resolve(resolved(result));
            } else if (options.validate && options.stats) {
              getLinkStatus(links)
                .then((validateLinks) => {
                  const stats = getStatsWithValidate(validateLinks);
                  const result = `\nTotal: ${stats.Total}\nUnique: ${stats.Unique}\nBroken: ${stats.Broken}`;
                  resolve(resolved(result));
                })
                .catch((error) => {
                  reject(rejected(error));
                });
            } else {
              resolve(resolved(links));
            }
          })
          .catch((error) => {
            reject(rejected(error));
          });
      } else {
        reject(rejected('No MD file found'));
      }
    } else {
      getLinksFromDirectory(absolutePath)
        .then((links) => {
          if (options.validate && !options.stats) {
            getLinkStatus(links)
              .then((validateLinks) => {
                resolve(resolved(validateLinks));
              })
              .catch((error) => {
                reject(rejected(error));
              });
          } else if (!options.validate && options.stats) {
            const stats = getStats(links);
            const result = `\nTotal: ${stats.Total}\nUnique: ${stats.Unique}`;
            resolve(resolved(result));
          } else if (options.validate && options.stats) {
            getLinkStatus(links)
              .then((validateLinks) => {
                const stats = getStatsWithValidate(validateLinks);
                const result = `\nTotal: ${stats.Total}\nUnique: ${stats.Unique}\nBroken: ${stats.Broken}`;
                resolve(resolved(result));
              })
              .catch((error) => {
                reject(rejected(error));
              });
          } else {
            resolve(resolved(links));
          }
        })
        .catch((error) => {
          reject(rejected(error));
        });
    }
  } else {
    reject(rejected('Invalid path'));
  }
});

module.exports = {
  mdLinks,
};
