#!/usr/bin/env node
const { mdLinks } = require('./src/index');
const { validateCommands } = require('./src/utils');

const args = process.argv.slice(2); //  process.argv property is an inbuilt application programming interface of the process module which is used to get the arguments passed to the node.js
const path = args[0];

const inputCommands = args.slice(1);

const options = validateCommands(inputCommands);
// console.log('options ', options);

function cli() {
  if ((Object.keys(options).length === 0) && (inputCommands.length !== 0)) {
    console.log('md-links: ', inputCommands, ' not a md-links command (s)');
  } else {
    mdLinks(path, options).then((links) => {
      console.log('Md-links: ', links);
    }).catch((error) => {
      console.log(error);
    });
  }
}

cli();
