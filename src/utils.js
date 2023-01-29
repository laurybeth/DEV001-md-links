const validateCommands = (inputCommands) => new Promise((resolve, reject) => {
  const options = {};
  // const commands = ['--validate', '--stats'];
  let invalidCommand = '';

  inputCommands.forEach((inputCommand) => {
    if (inputCommand.includes('--validate')) {
      options.validate = true;
    } else if (inputCommand.includes('--stats')) {
      options.stats = true;
    } else {
      invalidCommand += `${inputCommand} `;
    }
    /*     commands.forEach((command) => {
      if (inputCommand === command) {
        // console.log(inputCommand, command);
        //options[command] = true;
        options.command = true;
      }
    }); */
  });

  if ((Object.keys(options).length === 0) || invalidCommand) {
    reject(new Error(`Md-links: ${invalidCommand} not a md-links command (s)`));
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
