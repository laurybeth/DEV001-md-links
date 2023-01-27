const { getLinksFromDir } = require('./src/directory');
const {
  getLinks, getLinkStatus, getStats, getStatsWithValidate,
} = require('./src/link');

const {
  isValid, resolvePath, isDirectory, isMD,
} = require('./src/path');

const mdLinks = (filePath, options = {}) => new Promise((resolve, reject) => {
  if (isValid(filePath)) {
    const absolutePath = resolvePath(filePath);
    if (!isDirectory(absolutePath)) {
      // Identificar si el path corresponde a un archivo md
      if (isMD(absolutePath)) {
        getLinks(absolutePath)
          .then((links) => {
            if (links.length !== 0) {
              // eslint-disable-next-line no-use-before-define
              resolveOptions(links, options)
                .then((result) => resolve(result))
                .catch((error) => reject(error));
            } else {
              reject(new Error('No link found'));
            }
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject(new Error('No MD file found'));
      }
    } else {
      // const linksFromDirectory =
      getLinksFromDir(absolutePath)
        .then((links) => {
          // eslint-disable-next-line no-use-before-define
          resolveOptions(links, options)
            .then((result) => resolve(result))
            .catch((error) => reject(error));
        })
        .catch((error) => {
          reject(error);
        });
    }
  } else {
    reject(new Error('Invalid path'));
  }
});

const resolveOptions = (links, options) => new Promise((resolve, reject) => {
  if (options.validate && !options.stats) {
    getLinkStatus(links)
      .then((validateLinks) => {
        resolve(validateLinks);
      })
      .catch((error) => {
        reject(error);
      });
  } else if (!options.validate && options.stats) {
    const stats = getStats(links);
    const result = `\nTotal: ${stats.Total}\nUnique: ${stats.Unique}`;
    resolve(result);
  } else if (options.validate && options.stats) {
    getLinkStatus(links)
      .then((validateLinks) => {
        const stats = getStatsWithValidate(validateLinks);
        const result = `\nTotal: ${stats.Total}\nUnique: ${stats.Unique}\nBroken: ${stats.Broken}`;
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  } else {
    resolve(links);
  }
});

module.exports = {
  mdLinks,
};
