#!/usr/bin/env node
const { mdLinks } = require('./md-links');
const { validateCommands } = require('./src/utils');

const args = process.argv.slice(2); //  process.argv property is an inbuilt application programming interface of the process module which is used to get the arguments passed to the node.js
const path = args[0];

const inputCommands = args.slice(1);

// console.log('options ', options);

function cli() {
  validateCommands(inputCommands)
    .then((options) => mdLinks(path, options)
      .then((links) => {
        console.log('Md-links: ', links);
      }).catch((error) => {
        console.log(error);
      }))
    .catch((error) => console.log(error));
}

cli();
