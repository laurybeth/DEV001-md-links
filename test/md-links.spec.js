const axios = require('axios');

jest.useFakeTimers();

const responseResolve = { status: 200 };
const responseReject = { response: { status: 404 } };

jest.mock('axios', () => ({
  get: jest.fn((url) => new Promise((resolve, reject) => {
    resolve(responseResolve);
    reject(responseReject);
  })),
}));

const { mdLinks } = require('../src/index');

beforeEach(() => {
  jest.resetAllMocks();
});

const oneLink = [
  {
    href: 'https://curriculum.laboratoria.la/es/topics/javascript/02-flow-control/01-conditionals-and-loops',
    file: 'D:\\Documentos\\ProyectosLab\\DEV001-md-links\\sampleDirectory\\oneLink.md',
    text: 'Estructuras condicionales y repetitivas',
  },
];
const expectedLinkStatus = [
  {
    href: 'https://gist.github.com/BCasal/026e4c7f5c71418485c1',
    file: 'D:\\Documentos\\ProyectosLab\\DEV001-md-links\\sampleDirectory\\tenLinks.md',
    text: 'fork',
    status: 200,
    message: 'ok',
  },
  {
    href: 'https://gist.github.com/BCasal/026e4c7f5c71418485c1',
    file: 'D:\\Documentos\\ProyectosLab\\DEV001-md-links\\sampleDirectory\\tenLinks.md',
    text: 'fork',
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
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('Should reject when it is an invalid path', () => expect(mdLinks('./README'))
    .rejects
    .toMatch('Invalid path'));
  it('Should reject when the file path does not belong to an md file', () => expect(mdLinks('./src/index.js'))
    .rejects
    .toMatch('No MD file found'));
  it('Should resolve by returning an array of links with href, text and path properties', () => expect(mdLinks('./sampleDirectory/oneLink.md'))
    .resolves
    .toStrictEqual(oneLink));
  it('Should reject when the md file does not contain links', () => expect(mdLinks('./sampleDirectory/noLinks.md'))
    .rejects
    .toStrictEqual(new Error('No link found')));
  it('Should resolve by returning an array of links with href, text, path, status and message properties', () => {
    axios.get.mockResolvedValue(expectedLinkStatus);
    return mdLinks('./sampleDirectory/tenLinks.md', { validate: true })
      .then(
        (links) => expect(links)
          .toBe(expectedLinkStatus),
      );
  });
});
