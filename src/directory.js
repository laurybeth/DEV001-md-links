const fs = require('fs');
const { getLinks } = require('./link');

const { isDirectory, isMD } = require('./path');

const getLinksFromDirectory = (path) => {
  const files = fs.readdirSync(path);

  const arrayFiles = [];

  files.forEach((file) => {
    const filePath = `${path}/${file}`;

    if (isDirectory(filePath)) {
      // console.log('es directorio', filePath);
      getLinksFromDirectory(filePath);
    } else {
      arrayFiles.push(filePath);
    }
  });

  const mdFiles = arrayFiles.filter((filePath) => (isMD(filePath)));
  console.log('arrayFiles', mdFiles);
  if (mdFiles.length !== 0) {
    const arraysLinks = mdFiles.map((mdFile) => getLinks(mdFile)
      .then((arrayLinks) => arrayLinks));

    let totalLinks = [];

    Promise.allSettled(arraysLinks)
      .then((responses) => {
        responses.forEach((response) => {
          // console.log('value', response.value);
          const arrayLinks = response.value;

          arrayLinks.forEach((array) => {
            totalLinks = totalLinks.concat(array);
          });
        });
        // console.log('totalLinks', totalLinks);
        const arrayOfLinks = [];
        totalLinks.forEach((link) => {
          arrayOfLinks.push(link);
        });

        return arrayOfLinks;
      });
  }
  return arrayFiles;
};

const getFilesPathFromDir = (path) => {
  const arrayFiles = [];

  const files = fs.readdirSync(path);

  files.forEach((file) => {
    const filePath = `${path}/${file}`;

    if (isDirectory(filePath)) {
      // console.log('es directorio', filePath);
      getLinksFromDirectory(filePath, arrayFiles);
    } else {
      arrayFiles.push(filePath);
    }
  });
  return [...arrayFiles, ...getFilesPathFromDir(path)];
};

module.exports = {
  getLinksFromDirectory,
};
