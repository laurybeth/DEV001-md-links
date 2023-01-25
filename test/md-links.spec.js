const { mdLinks } = require('../src/md-links');
const {
  getLinkStatus, getLinks, getStats, getStatsWithValidate,
} = require('../src/link');

jest.mock('../src/link');

beforeEach(() => {
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

const expectedLinkStatus = [
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
    file: 'D:\\Documentos\\ProyectosLab\\DEV001-md-links\\sampleDirectory\\tenLinks.md',
    text: 'Clona',
    status: 200,
    message: 'ok',
  },
  {
    href: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175',
    file: 'D:\\Documentos\\ProyectosLab\\DEV001-md-links\\sampleDirectory\\tenLinks.md',
    text: 'Módulos, librerías, paquetes, frameworks... ¿cuál es la diferencia?',
    status: 400,
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

describe('mdLinks', () => {
  it('Should reject when it is an invalid path', () => expect(mdLinks('./README'))
    .rejects
    .toMatch('Invalid path'));
  it('Should reject when the file path does not belong to an md file', () => expect(mdLinks('./src/link.js'))
    .rejects
    .toMatch('No MD file found'));
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
      .toMatch('No link found');
  });
  it('Should resolve by returning an array of links with href, text, path, status and message properties', () => {
    getLinks.mockResolvedValue(fiveLinks);
    getLinkStatus.mockResolvedValue(expectedLinkStatus);
    expect(mdLinks('./sampleDirectory/fiveLinks.md', { validate: true }))
      .resolves
      .toEqual(expectedLinkStatus);
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
    getLinkStatus.mockResolvedValue(expectedLinkStatus);
    getStatsWithValidate.mockReturnValue({ Total: 5, Unique: 5, Broken: 2 });
    const result = '\nTotal: 5\nUnique: 5\nBroken: 2';
    expect(mdLinks('./sampleDirectory/fiveLinks.md', { stats: true, validate: true }))
      .resolves
      .toMatch(result);
  });
});
