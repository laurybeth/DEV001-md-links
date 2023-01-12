const fs = require('fs');
const path = require('path');

const isValidatePath = (path) => {
	if (fs.existsSync(path)) {
		return true;
	}
	return false;
};

module.exports = {
	isValidatePath,
};
