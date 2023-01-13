const fs = require('fs');
const path = require('path');

const isValid = (filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    return true;
  }
  return false;
};

const toAbsolute = (filePath) => {
  if (!path.isAbsolute(filePath)) {
    const absolutePath = path.resolve(filePath);
    return absolutePath;
  }
  return filePath;
};

const isMD = (absolutePath) => {
  const fileExtension = path.extname(absolutePath);
  console.log('file extension', fileExtension);
  if (fileExtension === '.md') {
    return true;
  }
  return false;
};

module.exports = {
  isValid,
  toAbsolute,
  isMD,
};
