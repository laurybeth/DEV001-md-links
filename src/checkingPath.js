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

module.exports = {
  isValid,
  toAbsolute,
};
