const MarkdownIt = require('markdown-it');
const fs = require('node:fs/promises');

const getLinks = (path) => {
  fs.readFile(path, { encoding: 'utf8' })
    .then((content) => {
      const md = new MarkdownIt();
      /* const toHtml = md.render(content);
      console.log('toHtml', toHtml); */
      const result = md.parse(content, {});

      for (let i = 0; i < result.length; i++) {
        if (result[i].type === 'inline') {
          //console.log('inline: ', result[i]);
          console.log('children: ', result[i].children);
          for (let j = 0; j < result[i].children.length; j++) {
            console.log('children[j]: ', result[i].children[j]);
            if (result[i].children[j].type === 'link_open') {
              console.log('attrs: ', result[i].children[j].attrs);
            }
          }
        }
      }
    })
    .catch();
};

module.exports = {
  getLinks,
};
