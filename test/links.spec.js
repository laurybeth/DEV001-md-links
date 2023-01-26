const { default: axios } = require('axios');

const { getLinkStatus, getStats, getStatsWithValidate } = require('../src/link');

jest.mock('axios');

beforeEach(() => {
  axios.get.mockClear();
});

const oneLink = [
  {
    href: 'https://curriculum.laboratoria.la/es/topics/javascript/02-flow-control/01-conditionals-and-loops',
    file: 'D:\\Documentos\\ProyectosLab\\DEV001-md-links\\sampleDirectory\\oneLink.md',
    text: 'Estructuras condicionales y repetitivas',
  },
];

const expectedOneLinkStatusOK = [
  {
    href: 'https://curriculum.laboratoria.la/es/topics/javascript/02-flow-control/01-conditionals-and-loops',
    file: 'D:\\Documentos\\ProyectosLab\\DEV001-md-links\\sampleDirectory\\oneLink.md',
    text: 'Estructuras condicionales y repetitivas',
    status: 200,
    message: 'ok',
  },
];

const threeLinkFail = [
  {
    href: 'https://medium.freecodecamp.org/what-exactly-is-node-js-ae36e97449f5',
    file: 'D:\\Documentos\\ProyectosLab\\DEV001-md-links\\sampleDirectory\\mdreadme.md',
    text: 'What exactly is Node.js? - freeCodeCamp',
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

const expectedThreeLinkStatusFail = [
  {
    href: 'https://medium.freecodecamp.org/what-exactly-is-node-js-ae36e97449f5',
    file: 'D:\\Documentos\\ProyectosLab\\DEV001-md-links\\sampleDirectory\\mdreadme.md',
    text: 'What exactly is Node.js? - freeCodeCamp',
    status: 400,
    message: 'fail',
  },
  {
    href: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175',
    file: 'D:\\Documentos\\ProyectosLab\\DEV001-md-links\\sampleDirectory\\fiveLinks.md',
    text: 'Módulos, librerías, paquetes, frameworks... ¿cuál es la diferencia?',
    status: 500,
    message: 'fail',
  },
  {
    href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
    file: 'D:\\Documentos\\ProyectosLab\\DEV001-md-links\\sampleDirectory\\fiveLinks.md',
    text: 'Funciones — bloques de código reutilizables - MDN',
    status: 404,
    message: 'fail',
  },
];

describe('getLinkStatus', () => {
  it('Should resolve by returning an array of links with href, text, path, status and message properties', () => {
    axios.get.mockResolvedValue({ status: 200 });
    return expect(getLinkStatus(oneLink))
      .resolves
      .toEqual(expectedOneLinkStatusOK);
  });
  it('Should resolve by returning an array of links with fail message', () => {
    axios.get.mockRejectedValueOnce({});
    axios.get.mockRejectedValueOnce({ request: {} });
    axios.get.mockRejectedValueOnce({ response: { status: 404 } });
    return expect(getLinkStatus(threeLinkFail))
      .resolves
      .toEqual(expectedThreeLinkStatusFail);
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
    expect(getStatsWithValidate(expectedOneLinkStatusOK))
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
