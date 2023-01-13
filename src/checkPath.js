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

const isDirectory = (filePath) => {
  if (fs.statSync(filePath).isDirectory()) {
    return true;
  }
  return false;
};

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
  toAbsolute,
  isMD,
};
