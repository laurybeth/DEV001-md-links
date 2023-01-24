const fs = require('fs');
const { getLinks } = require('./link');

const { isDirectory, isMD } = require('./path');

const getLinksFromDirectory = (path) => new Promise((resolve, reject) => {
  const files = fs.readdirSync(path);
  const arrayFiles = [];

  files.forEach((file) => {
    const filePath = `${path}/${file}`;
    if (isDirectory(filePath)) {
      getLinksFromDirectory(filePath);
    } else {
      arrayFiles.push(filePath);
    }
  });

  const mdFiles = arrayFiles.filter((filePath) => (isMD(filePath)));

  // resolve(mdFiles);

  if (mdFiles.length !== 0) {
    const arraysLinks = mdFiles
      .map((mdFile) => getLinks(mdFile)
        .then((arrayLinks) => arrayLinks)
        .catch((error) => reject(error)));

    const totalLinks = [];

    Promise.all(arraysLinks).then((arrayLinks) => {
      arrayLinks.forEach((arrays) => {
        arrays.forEach((link) => {
          // console.log('link', link);
          totalLinks.push(link);
        });
      });
      resolve(totalLinks);
    });

    // resolve(finalLinks);
  } else {
    reject(new Error('No MD file found'));
  }
});

module.exports = {
  getLinksFromDirectory,
};
