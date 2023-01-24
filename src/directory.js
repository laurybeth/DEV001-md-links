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

    let totalLinks = [];

    Promise.allSettled(arraysLinks)
      .then((responses) => {
        responses.forEach((response) => {
          if (response.value !== undefined) {
            const arrayLinks = response.value;
            arrayLinks.forEach((array) => {
              totalLinks = totalLinks.concat(array);
            });
          }
        });
        // console.log(totalLinks);
        resolve(totalLinks);
      });

    /*     Promise.all(arraysLinks)
      .then((arrayLinks) => {
        arrayLinks.forEach((array) => {
          totalLinks = totalLinks.concat(array);
        });
        resolve(totalLinks);
      }); */
  } else {
    reject(new Error('No MD file found'));
  }
});

module.exports = {
  getLinksFromDirectory,
};
