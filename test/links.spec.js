const { default: axios } = require('axios');

const { getLinkStatus, getStats, getStatsWithValidate } = require('../src/link');

jest.mock('axios');

// const md = new MarkdownIt();

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

const expectedOneLinkStatus = [
  {
    href: 'https://curriculum.laboratoria.la/es/topics/javascript/02-flow-control/01-conditionals-and-loops',
    file: 'D:\\Documentos\\ProyectosLab\\DEV001-md-links\\sampleDirectory\\oneLink.md',
    text: 'Estructuras condicionales y repetitivas',
    status: 200,
    message: 'ok',
  },
];

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
