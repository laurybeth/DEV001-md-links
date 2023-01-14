const MarkdownIt = require('markdown-it');
const fs = require('node:fs/promises');

const getLinks = (path) => {
  fs.readFile(path, { encoding: 'utf8' })
    .then((content) => {
      const md = new MarkdownIt();
      const result = md.render(content);
      console.log('result: ', result);
    })
    .catch();
};

module.exports = {
  getLinks,
};
