const validateCommands = (commands) => new Promise((resolve, reject) => {
  const options = {};

  if (commands.includes('--validate')) {
    options.validate = true;
  }

  if (commands.includes('--stats')) {
    options.stats = true;
  }

  resolve(options);
});

/* const validateCommands = (commands) => {

  if (commands.includes('--validate')) {
    options.validate = true;
  }

  if (commands.includes('--stats')) {
    options.stats = true;
  }

  return options;
}; */

module.exports = {
  validateCommands,
};
