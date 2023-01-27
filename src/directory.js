const fs = require('fs');
const { getLinks } = require('./link');

const { resolvePath, isDirectory, isMD } = require('./path');

const getMDFilesPathFromDir = (path) => {
  let arrayFiles = [];
  if (isDirectory(path)) {
    const directoryFiles = fs.readdirSync(path);

    directoryFiles.forEach((file) => {
      arrayFiles = arrayFiles.concat(getMDFilesPathFromDir(`${path}\\${file}`));
    });
  } else {
    arrayFiles.push(path);
  }
  return arrayFiles.filter((file) => isMD(file));
};

const getLinksFromDir = (path) => new Promise((resolve, reject) => {
  // todo el codigo
  const absolutePath = resolvePath(path);
  const mdFiles = getMDFilesPathFromDir(absolutePath);
  if (mdFiles.length !== 0) {
    const manyArraysLinks = mdFiles.map((mdFile) => getLinks(mdFile)
      .then((arrayLinks) => arrayLinks));

    let singleArrayLinks = [];
    Promise.all(manyArraysLinks).then((arraysLinks) => {
      arraysLinks.forEach((array) => {
        singleArrayLinks = singleArrayLinks.concat(array);
      });

      resolve(Promise.all(singleArrayLinks));
    });
  } else {
    reject(new Error('No MD file found'));
  }
});

module.exports = {
  getMDFilesPathFromDir,
  getLinksFromDir,
};
