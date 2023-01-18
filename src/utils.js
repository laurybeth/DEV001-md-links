const validateCommands = (commands) => {
  const options = {};

  if (commands.includes('--validate')) {
    options.validate = true;
  }

  if (commands.includes('--stats')) {
    options.stats = true;
  }

  return options;
};

module.exports = {
  validateCommands,
};
