const MarkdownIt = require('markdown-it');
const path = require('path');
const { default: axios } = require('axios');
const fs = require('fs');

const md = new MarkdownIt();
const {
  getLinks, getLinkStatus, getStats, getStatsWithValidate,
} = require('../src/link');

jest.mock('fs');
jest.mock('markdown-it');
jest.mock('axios');

// const md = new MarkdownIt();

beforeEach(() => {
  axios.get.mockClear();
  fs.readFile.mockClear();
  md.parse.mockClear();
});

const readFileContent = `<details>
<p>

[Estructuras condicionales y repetitivas](https://curriculum.laboratoria.la/es/topics/javascript/02-flow-control/01-conditionals-and-loops)

</p></details>`;

const htmlContentArray = [
  {
    type: 'paragraph_open',
    tag: 'p',
    attrs: null,
    map: [0, 2],
    nesting: 1,
    level: 0,
    children: null,
    content: '',
    markup: '',
    info: '',
    meta: null,
    block: true,
    hidden: false,
  },
  {
    type: 'inline',
    tag: '',
    attrs: null,
    map: [0, 2],
    nesting: 0,
    level: 1,
    children: [{
      type: 'text',
      tag: '',
      attrs: null,
      map: null,
      nesting: 0,
      level: 0,
      children: null,
      content: '<details>',
      markup: '',
      info: '',
      meta: null,
      block: false,
      hidden: false,
    }, {
      type: 'softbreak',
      tag: 'br',
      attrs: null,
      map: null,
      nesting: 0,
      level: 0,
      children: null,
      content: '',
      markup: '',
      info: '',
      meta: null,
      block: false,
      hidden: false,
    }, {
      type: 'text',
      tag: '',
      attrs: null,
      map: null,
      nesting: 0,
      level: 0,
      children: null,
      content: '<p>',
      markup: '',
      info: '',
      meta: null,
      block: false,
      hidden: false,
    }],
    content: '<details>\n  <p>',
    markup: '',
    info: '',
    meta: null,
    block: true,
    hidden: false,
  },
  {
    type: 'paragraph_close',
    tag: 'p',
    attrs: null,
    map: null,
    nesting: -1,
    level: 0,
    children: null,
    content: '',
    markup: '',
    info: '',
    meta: null,
    block: true,
    hidden: false,
  },
  {
    type: 'paragraph_open',
    tag: 'p',
    attrs: null,
    map: [3, 4],
    nesting: 1,
    level: 0,
    children: null,
    content: '',
    markup: '',
    info: '',
    meta: null,
    block: true,
    hidden: false,
  },
  {
    type: 'inline',
    tag: '',
    attrs: null,
    map: [3, 4],
    nesting: 0,
    level: 1,
    children: [{
      type: 'link_open',
      tag: 'a',
      attrs: [
        [
          'href',
          'https://curriculum.laboratoria.la/es/topics/javascript/02-flow-control/01-conditionals-and-loops',
        ],
      ],
      map: null,
      nesting: 1,
      level: 0,
      children: null,
      content: '',
      markup: '',
      info: '',
      meta: null,
      block: false,
      hidden: false,
    }, {
      type: 'text',
      tag: '',
      attrs: null,
      map: null,
      nesting: 0,
      level: 1,
      children: null,
      content: 'Estructuras condicionales y repetitivas',
      markup: '',
      info: '',
      meta: null,
      block: false,
      hidden: false,
    }, {
      type: 'link_close',
      tag: 'a',
      attrs: null,
      map: null,
      nesting: -1,
      level: 0,
      children: null,
      content: '',
      markup: '',
      info: '',
      meta: null,
      block: false,
      hidden: false,
    }],
    content: '[Estructuras condicionales y repetitivas](https://curriculum.laboratoria.la/es/topics/javascript/02-flow-control/01-conditionals-and-loops)',
    markup: '',
    info: '',
    meta: null,
    block: true,
    hidden: false,
  },
  {
    type: 'paragraph_close',
    tag: 'p',
    attrs: null,
    map: null,
    nesting: -1,
    level: 0,
    children: null,
    content: '',
    markup: '',
    info: '',
    meta: null,
    block: true,
    hidden: false,
  },
  {
    type: 'paragraph_open',
    tag: 'p',
    attrs: null,
    map: [5, 6],
    nesting: 1,
    level: 0,
    children: null,
    content: '',
    markup: '',
    info: '',
    meta: null,
    block: true,
    hidden: false,
  },
  {
    type: 'inline',
    tag: '',
    attrs: null,
    map: [5, 6],
    nesting: 0,
    level: 1,
    children: [{
      type: 'text',
      tag: '',
      attrs: null,
      map: null,
      nesting: 0,
      level: 0,
      children: null,
      content: '</p></details>',
      markup: '',
      info: '',
      meta: null,
      block: false,
      hidden: false,
    }],
    content: '</p></details>',
    markup: '',
    info: '',
    meta: null,
    block: true,
    hidden: false,
  },
  {
    type: 'paragraph_close',
    tag: 'p',
    attrs: null,
    map: null,
    nesting: -1,
    level: 0,
    children: null,
    content: '',
    markup: '',
    info: '',
    meta: null,
    block: true,
    hidden: false,
  },
];

const oneLink = [
  {
    href: 'https://curriculum.laboratoria.la/es/topics/javascript/02-flow-control/01-conditionals-and-loops',
    file: 'D:\\Documentos\\ProyectosLab\\DEV001-md-links\\sampleDirectory\\oneLink.md',
    text: 'Estructuras condicionales y repetitivas',
  },
];

const expectedOneLinkStatus = [
  {
    href: 'https://curriculum.laboratoria.la/es/topics/javascript/02-flow-control/01-conditionals-and-loops',
    file: 'D:\\Documentos\\ProyectosLab\\DEV001-md-links\\sampleDirectory\\oneLink.md',
    text: 'Estructuras condicionales y repetitivas',
    status: 200,
    message: 'ok',
  },
];

describe('getLinks', () => {
  it('Should resolve by returning an array of links with href, text and path properties', () => {
    fs.readFile.mockResolvedValue(readFileContent);
    md.parse.mockReturnValue(htmlContentArray);
    const resolvePath = path.resolve('./sampleDirectory/fiveLinks.md');
    return expect(getLinks(resolvePath))
      .resolves
      .toEqual(oneLink);
  });
});

describe('getLinkStatus', () => {
  it('Should resolve by returning an array of links with href, text, path, status and message properties', () => {
    axios.get.mockResolvedValue({ status: 200 });
    return expect(getLinkStatus(oneLink))
      .resolves
      .toEqual(expectedOneLinkStatus);
  });
});

describe('getStats', () => {
  it('Should resolve by returning an array of links with href, text, path, status and message properties', () => {
    const stats = { Total: 1, Unique: 1 };

    expect(getStats(oneLink))
      .toEqual(stats);
  });
});

describe('getStatsWithValidate', () => {
  it('Should resolve by returning an array of links with href, text, path, status and message properties', () => {
    const stats = { Total: 1, Unique: 1, Broken: 0 };
    expect(getStatsWithValidate(expectedOneLinkStatus))
      .toEqual(stats);
  });
});
/*  it('Should resolve by returning an array of links with href, text, path, status and message properties', () => {
    axios.get.mockResolvedValue({ status: 200 });
    return getLinkStatus(oneLink)
      .then((response) => {
        expect(response[0])
          .toHaveProperty('status', 200);
      });
  }); */
