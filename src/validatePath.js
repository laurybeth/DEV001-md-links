const fs = require('fs');
const path = require('path');

const isValidatePath = (filePath) => {
  if (fs.existsSync(filePath)) {
    return true;
  }
  return false;
};

module.exports = {
  isValidatePath,
};
