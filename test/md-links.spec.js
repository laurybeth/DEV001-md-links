const { mdLinks } = require('../md-links');
const {
  getLinkStatus, getLinks, getStats, getStatsWithValidate,
} = require('../src/link');

const { getLinksFromDir } = require('../src/directory');

jest.mock('../src/link');
jest.mock('../src/directory');

beforeEach(() => {
  getLinksFromDir.mockClear();
  getLinks.mockClear();
  getLinkStatus.mockClear();
  getStats.mockClear();
  getStatsWithValidate.mockClear();
});

const oneLink = [
  {
    href: 'https://curriculum.laboratoria.la/es/topics/javascript/02-flow-control/01-conditionals-and-loops',
    file: 'D:\\Documentos\\ProyectosLab\\DEV001-md-links\\sampleDirectory\\oneLink.md',
    text: 'Estructuras condicionales y repetitivas',
  },
];

const fiveLinks = [
  {
    href: 'https://help.github.com/articles/fork-a-repo/',
    file: 'D:\\Documentos\\ProyectosLab\\DEV001-md-links\\sampleDirectory\\fiveLinks.md',
    text: 'fork',
  },
  {
    href: 'https://gist.github.com/BCasal/026e4c7f5c71418485c1',
    file: 'D:\\Documentos\\ProyectosLab\\DEV001-md-links\\sampleDirectory\\fiveLinks.md',
    text: 'configurar',
  },
  {
    href: 'https://help.github.com/articles/cloning-a-repository/',
    file: 'D:\\Documentos\\ProyectosLab\\DEV001-md-links\\sampleDirectory\\fiveLinks.md',
    text: 'Clona',
  },
  {
    href: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175',
    file: 'D:\\Documentos\\ProyectosLab\\DEV001-md-links\\sampleDirectory\\fiveLinks.md',
    text: 'Módulos, librerías, paquetes, frameworks... ¿cuál es la diferencia?',
  },
  {
    href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
    file: 'D:\\Documentos\\ProyectosLab\\DEV001-md-links\\sampleDirectory\\fiveLinks.md',
    text: 'Funciones — bloques de código reutilizables - MDN',
  },
];

const fiveLinkStatus = [
  {
    href: 'https://help.github.com/articles/fork-a-repo/',
    file: 'D:\\Documentos\\ProyectosLab\\DEV001-md-links\\sampleDirectory\\fiveLinks.md',
    text: 'fork',
    status: 200,
    message: 'ok',
  },
  {
    href: 'https://gist.github.com/BCasal/026e4c7f5c71418485c1',
    file: 'D:\\Documentos\\ProyectosLab\\DEV001-md-links\\sampleDirectory\\fiveLinks.md',
    text: 'configurar',
    status: 200,
    message: 'ok',
  },
  {
    href: 'https://help.github.com/articles/cloning-a-repository/',
    file: 'D:\\Documentos\\ProyectosLab\\DEV001-md-links\\sampleDirectory\\tenLinks.md',
    text: 'Clona',
    status: 200,
    message: 'ok',
  },
  {
    href: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175',
    file: 'D:\\Documentos\\ProyectosLab\\DEV001-md-links\\sampleDirectory\\tenLinks.md',
    text: 'Módulos, librerías, paquetes, frameworks... ¿cuál es la diferencia?',
    status: 500,
    message: 'fail',
  },
  {
    href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
    file: 'D:\\Documentos\\ProyectosLab\\DEV001-md-links\\sampleDirectory\\tenLinks.md',
    text: 'Funciones — bloques de código reutilizables - MDN',
    status: 404,
    message: 'fail',
  },
];

const dirLinks = [
  {
    href: 'https://nodejs.org/api/path.html',
    file: 'D:\\Documentos\\ProyectosLab\\DEV001-md-links\\sampleDirectory\\directory\\directoryTwo\\twoLinks.md',
    text: 'Path',
  },
  {
    href: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e',
    file: 'D:\\Documentos\\ProyectosLab\\DEV001-md-links\\sampleDirectory\\directory\\directoryTwo\\twoLinks.md',
    text: 'Linea de comando CLI',
  },

  {
    href: 'https://github.com/workshopper/learnyounode',
    file: 'D:\\Documentos\\ProyectosLab\\DEV001-md-links\\sampleDirectory\\directory\\threeLinks.md',
    text: 'learnyounode',
  },
  {
    href: 'https://github.com/workshopper/how-to-npm',
    file: 'D:\\Documentos\\ProyectosLab\\DEV001-md-links\\sampleDirectory\\directory\\threeLinks.md',
    text: 'how-to-npm',
  },
  {
    href: 'https://github.com/stevekane/promise-it-wont-hurt',
    file: 'D:\\Documentos\\ProyectosLab\\DEV001-md-links\\sampleDirectory\\directory\\threeLinks.md',
    text: 'promise-it-wont-hurt',
  },
];

const dirLinksStatus = [
  {
    href: 'https://nodejs.org/api/path.html',
    file: 'D:\\Documentos\\ProyectosLab\\DEV001-md-links\\sampleDirectory\\directory\\directoryTwo\\twoLinks.md',
    text: 'Path',
    status: 200,
    message: 'ok',
  },
  {
    href: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e',
    file: 'D:\\Documentos\\ProyectosLab\\DEV001-md-links\\sampleDirectory\\directory\\directoryTwo\\twoLinks.md',
    text: 'Linea de comando CLI',
    status: 200,
    message: 'ok',
  },
  {
    href: 'https://github.com/workshopper/learnyounode',
    file: 'D:\\Documentos\\ProyectosLab\\DEV001-md-links\\sampleDirectory\\directory\\threeLinks.md',
    text: 'learnyounode',
    status: 200,
    message: 'ok',
  },
  {
    href: 'https://github.com/workshopper/how-to-npm',
    file: 'D:\\Documentos\\ProyectosLab\\DEV001-md-links\\sampleDirectory\\directory\\threeLinks.md',
    text: 'how-to-npm',
    status: 200,
    message: 'ok',
  },
  {
    href: 'https://github.com/stevekane/promise-it-wont-hurt',
    file: 'D:\\Documentos\\ProyectosLab\\DEV001-md-links\\sampleDirectory\\directory\\threeLinks.md',
    text: 'promise-it-wont-hurt',
    status: 200,
    message: 'ok',
  },
];

describe('mdLinks', () => {
  it('Should reject when it is an invalid path', () => expect(mdLinks('./README'))
    .rejects
    .toEqual(new Error('Invalid path')));
  it('Should reject when the file path does not belong to an md file', () => expect(mdLinks('./src/link.js'))
    .rejects
    .toEqual(new Error('No MD file found')));
  it('Should resolve by returning an array of links with href, text and path properties', () => {
    getLinks.mockResolvedValue(oneLink);
    expect(mdLinks('./sampleDirectory/oneLink.md'))
      .resolves
      .toStrictEqual(oneLink);
  });
  it('Should reject when the md file does not contain links', () => {
    getLinks.mockResolvedValue([]);
    expect(mdLinks('./sampleDirectory/noLinks.md'))
      .rejects
      .toEqual(new Error('No link found'));
  });
  it('Should resolve by returning an array of links with href, text, path, status and message properties', () => {
    getLinks.mockResolvedValue(fiveLinks);
    getLinkStatus.mockResolvedValue(fiveLinkStatus);
    expect(mdLinks('./sampleDirectory/fiveLinks.md', { validate: true }))
      .resolves
      .toEqual(fiveLinkStatus);
  });
  it('Should resolve by returning total and unique links', () => {
    getLinks.mockResolvedValue(fiveLinks);
    getStats.mockReturnValue({ Total: 5, Unique: 5 });
    const result = '\nTotal: 5\nUnique: 5';
    expect(mdLinks('./sampleDirectory/fiveLinks.md', { stats: true }))
      .resolves
      .toMatch(result);
  });
  it('Should resolve by returning total, unique and broken links', () => {
    getLinks.mockResolvedValue(fiveLinks);
    getLinkStatus.mockResolvedValue(fiveLinkStatus);
    getStatsWithValidate.mockReturnValue({ Total: 5, Unique: 5, Broken: 2 });
    const result = '\nTotal: 5\nUnique: 5\nBroken: 2';
    expect(mdLinks('./sampleDirectory/fiveLinks.md', { stats: true, validate: true }))
      .resolves
      .toMatch(result);
  });

  it('Should resolve by returning all links from a directory with href, text, path properties', () => {
    getLinksFromDir.mockResolvedValue(dirLinks);
    expect(mdLinks('./sampleDirectory/directory'))
      .resolves
      .toEqual(dirLinks);
  });
  it('Should resolve by returning all links from a directory with href, text, path, status and message properties', () => {
    getLinksFromDir.mockResolvedValue(dirLinks);
    getLinkStatus.mockResolvedValue(dirLinksStatus);
    expect(mdLinks('./sampleDirectory/directory', { validate: true }))
      .resolves
      .toEqual(dirLinksStatus);
  });
});
