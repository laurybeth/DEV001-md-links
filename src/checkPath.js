const fs = require('fs');
const path = require('path');

const isValid = (filePath) => (filePath && fs.existsSync(filePath));

const resolvePath = (filePath) => path.resolve(filePath);

const isDirectory = (filePath) => fs.statSync(filePath).isDirectory();

const isMD = (absolutePath) => {
  const fileExtension = path.extname(absolutePath).toLowerCase();

  if (fileExtension === '.md') {
    return true;
  }
  return false;
};

module.exports = {
  isValid,
  isDirectory,
  resolvePath,
  isMD,
};
