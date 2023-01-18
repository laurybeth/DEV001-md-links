const MarkdownIt = require('markdown-it');
const fs = require('node:fs/promises');
const fetch = require('node-fetch');

const getLinks = (path) => new Promise((resolve, reject) => {
  fs.readFile(path, { encoding: 'utf8' })
    .then((content) => {
      const arrayLinks = [];
      const md = new MarkdownIt();
      const htmlContentArray = md.parse(content, {});

      const inlineTokensArray = htmlContentArray.filter((token) => (token.type === 'inline'));

      inlineTokensArray.forEach((token) => {
        let isLinkOpen = false;
        let isLinkClosed = false;
        let text = '';
        const linkObj = {};
        token.children.forEach((child) => {
          if ((isLinkOpen === true) && (isLinkClosed === false)) {
            text += child.content;
          }
          if (child.type === 'link_open') {
            const href = child.attrs[0][1];
            linkObj.href = href;
            linkObj.file = path;
            // console.log('href: ', linkObj.href);
            isLinkOpen = true;
          }
          if (child.type === 'link_close') {
            linkObj.text = text;
            // console.log('text: ', linkObj.text);
            isLinkClosed = true;
            arrayLinks.push(linkObj);
          }
        });
      });

      if (arrayLinks.length === 0) {
        reject(new Error('No link found'));
      } else {
        resolve(arrayLinks);
      }

      // console.log('arrayLinks: ', arrayLinks);
    })
    .catch((error) => {
      reject(new Error(error));
    });
});

const getLinkStatus = (arrayLinks) => new Promise((resolve, reject) => {
  const validateLinks = arrayLinks.map((link) => fetch(link.href)
    .then((response) => ({
      href: link.href,
      text: link.text,
      file: link.file,
      status: response.status,
      ok: response.status < 400 ? 'ok' : 'fail',
    })).catch((error) => {
      console.log('error: ', error);
      reject(new Error(error));
    }));
  //console.log('validateLinks: ', validateLinks);
  resolve(Promise.all(validateLinks));
});

module.exports = {
  getLinks,
  getLinkStatus,
};

/*       for (let i = 0; i < result.length; i += 1) {
        if (result[i].type === 'inline') {
          // console.log('inline: ', result[i]);
          // console.log('children: ', result[i].children);
          for (let j = 0; j < result[i].children.length; j += 1) {
            // console.log('children[j]: ', result[i].children[j]);

            if (result[i].children[j].type === 'link_open') {
              console.log('href: ', result[i].children[j].attrs[0][1]);
              let z = j + 1;
              let text = '';
              while (result[i].children[z].type !== 'link_close') {
                text += result[i].children[z].content;

                z += 1;
              }
              console.log('text: ', text);
            }
          }
        }
      } */
