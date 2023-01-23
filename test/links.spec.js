const { default: axios } = require('axios');
const { getLinkStatus } = require('../src/link');

jest.mock('axios');

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

describe('links', () => {
  it('Should resolve by returning an array of links with href, text, path, status and message properties', () => {
    axios.get.mockResolvedValue({ status: 200 });
    return expect(getLinkStatus(oneLink))
      .resolves
      .toEqual(expectedOneLinkStatus);
  });

  it('Should resolve by returning an array of links with href, text, path, status and message properties', () => {
    axios.get.mockResolvedValue({ status: 200 });
    return getLinkStatus(oneLink).then((response) => {
      expect(response[0]).toHaveProperty('status', 200);
    });
  });
});
