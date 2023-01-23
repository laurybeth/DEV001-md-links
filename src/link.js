const MarkdownIt = require('markdown-it');
const fs = require('node:fs/promises');
// const fetch = require('node-fetch');
const axios = require('axios');

const getLinks = (path) => new Promise((resolve, reject) => {
  fs.readFile(path, { encoding: 'utf8' })
    .then((content) => {
      const arrayLinks = [];
      const md = new MarkdownIt();
      const htmlContentArray = md.parse(content, {});

      const inlineTokensArray = htmlContentArray.filter((token) => (token.type === 'inline'));

      inlineTokensArray.forEach((token) => {
        let isLinkOpen = false;
        let isLinkClosed = true;
        let isTitle = false;
        let href = '';
        let text = '';
        token.children.forEach((child) => {
          if ((isLinkOpen === true) && (isLinkClosed === false)) {
            text += child.content;
          }

          if ((child.type === 'link_open') && (child.attrs[0][1][0] !== '#')) {
            // eslint-disable-next-line prefer-destructuring
            href = child.attrs[0][1];
            text = '';
            isLinkOpen = true;
            isLinkClosed = false;
          } else if ((child.type === 'link_open') && (child.attrs[0][1][0] === '#')) {
            isTitle = true;
          }
          if ((child.type === 'link_close') && (isTitle === false)) {
            const linkObj = {};
            linkObj.href = href;
            linkObj.file = path;
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

const getLinkStatus = (arrayLinks) => new Promise((resolve) => {
  const validateLinks = arrayLinks.map((link) => axios.get(link.href)
    .then((response) => {
      // handle success
      const { status } = response;
      return { ...link, status, message: 'ok' };
    })
    .catch((error) => { // handle error
      let errorStatus;
      if (error.response) {
        // La respuesta fue hecha y el servidor respondió con un código de estado
        // que esta fuera del rango de 2xx
        errorStatus = error.response.status;
      } else if (error.request) {
        // La petición fue hecha pero no se recibió respuesta
        errorStatus = 400;
      } else {
        // Algo paso al preparar la petición que lanzo un Error
        errorStatus = 500;
      }
      // console.log('errorStatus', errorStatus);
      return { ...link, status: errorStatus, message: 'fail' };
    }));
  // console.log('validateLinks: ', validateLinks);
  resolve(Promise.all(validateLinks));
});

const getStats = (links) => {
  const uniqueLinks = new Set(links
    .map((link) => link.href)).size;
  return {
    Total: links.length,
    Unique: uniqueLinks,
  };
};

const getStatsValidate = (links) => {
  const uniqueLinks = new Set(links.map((link) => link.href)).size;
  const brokenLinks = links.filter((link) => link.message === 'fail');
  return {
    Total: links.length,
    Unique: uniqueLinks,
    Broken: brokenLinks.length,
  };
};

module.exports = {
  getLinks,
  getLinkStatus,
  getStats,
  getStatsValidate,
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
